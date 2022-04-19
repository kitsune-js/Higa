import {
  GatewayChannelDeleteDispatchData,
  GatewayPresenceUpdateData
} from 'discord-api-types/gateway';
import { EventEmitter } from 'node:events';
import WebSocket from 'ws';

import {
  AuditLogManager,
  CacheManager,
  ChannelManager,
  InviteManager,
  UserManager,
  VoiceManager
} from '.';
import { Message, Channel, Application } from '../structures';

/* It's a constant that contains all the intents the bot can listen to. */
enum ClientIntents {
  GUILDS = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_BANS = 1 << 2,
  GUILD_EMOJIS_AND_STICKERS = 1 << 3,
  GUILD_INTEGRATIONS = 1 << 4,
  GUILD_WEBHOOKS = 1 << 5,
  GUILD_INVITES = 1 << 6,
  GUILD_VOICE_STATES = 1 << 7,
  GUILD_PRESENCES = 1 << 8,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  GUILD_MESSAGE_TYPING = 1 << 11,
  DIRECT_MESSAGES = 1 << 12,
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  DIRECT_MESSAGE_TYPING = 1 << 14,
  GUILD_SCHEDULED_EVENTS = 1 << 16
}

interface ClientEvents {
  READY: [client: Application];
  MESSAGE_CREATE: [message: Message];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DEBUG: any;
  THREAD_CREATE: [thread: Channel];
  THREAD_DELETE: [thread: Channel];
}

type APIVersions = '6' | '7' | '8' | '9';

interface ClientOptions {
  token: string;
  tokenType: 'Bearer' | 'Bot' | '';
  intents?: (keyof typeof ClientIntents)[];
  version?: APIVersions;
  wsConnection?: boolean;
}

class Client extends EventEmitter {
  /**
   * Application's token
   */
  private readonly token: string;

  /**
   * Token type
   */
  private readonly tokenType: 'Bearer' | 'Bot' | '';

  /**
   * Intents the application has activated
   */
  public readonly intents: number;
  /**
   * API Version to use
   */
  public readonly version: APIVersions;

  /**
   * Websocket to connect the application to the Discord Gateway
   */
  private ws: WebSocket = new WebSocket(
    'wss://gateway.discord.gg/?v=9&encoding=json'
  );
  private heartbeat_interval = 0;
  private hearbeat_responded = false;
  private connection_closed = false;
  private sequence_number: number | null = null;
  private session_id = '';

  /**
   * Application's cache
   */
  private cache = new CacheManager();

  /**
   * Audit Log Manager to interact with the REST API
   */
  public auditLog: AuditLogManager;

  /**
   * Channel Manager to interact with the REST API
   */
  public channel: ChannelManager;

  /**
   * Invite Manager to interact with the REST API
   */
  public invite: InviteManager;

  /**
   * User Manager to interact with the REST API
   */
  public user: UserManager;

  /**
   * Voice Manager to interact with the REST API
   */
  public voice: VoiceManager;

  /**
   *
   * @param token - Bot token
   * @param intents - Array of intents the bot will be listening to
   */
  constructor(options: ClientOptions) {
    super();
    this.token = options.token;
    this.tokenType = options.tokenType;

    if (options.wsConnection === undefined || this.tokenType !== 'Bot')
      options.wsConnection = true;

    if (options.wsConnection) this.setupWebSocket();

    if (!options.intents) options.intents = [];

    this.intents = this.intentsToNumber(options.intents);

    if (!options.version) options.version = '9';

    this.version = options.version;

    this.once('READY', () => {
      setInterval(() => {
        if (this.hearbeat_responded) {
          this.ws.send(
            JSON.stringify({
              op: 1,
              d: this.sequence_number
            })
          );
          this.hearbeat_responded = false;
        } else {
          this.ws.close();
          this.connection_closed = true;
          this.ws = new WebSocket(
            `wss://gateway.discord.gg/?v=${this.version}&encoding=json'`
          );
          this.setupWebSocket();
        }
      }, this.heartbeat_interval);
    });

    this.auditLog = new AuditLogManager(
      this.token,
      this.tokenType,
      this.version
    );
    this.channel = new ChannelManager(
      this.token,
      this.tokenType,
      this.cache,
      this.version
    );
    this.invite = new InviteManager(this.token, this.tokenType, this.version);
    this.user = new UserManager(this.token, this.tokenType, this.version);
    this.voice = new VoiceManager(this.token, this.tokenType, this.version);
  }

  /**
   * The `on` function is a method that adds a listener to the client's event emitter
   * @param {K} eventName - The name of the event you want to listen to.
   * @param listener - The listener function that will be called when the event is emitted.
   * @returns The `this` object.
   */
  public override on<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this {
    return super.on(eventName, listener);
  }

  /**
   * The `once` method is a method that allows you to listen to an event only once.
   * @param {K} eventName - The name of the event you want to listen to.
   * @param listener - The listener function that will be called when the event is emitted.
   * @returns The client.
   */
  public override once<K extends keyof ClientEvents>(
    eventName: K,
    listener: (...args: ClientEvents[K]) => void
  ): this {
    return super.once(eventName, listener);
  }

  /**
   * It takes an event name and any number of arguments, and calls the `emit` method on the `Client`
   * class with the event name and arguments
   * @param {K | string} eventName - The name of the event to emit.
   * @param {ClientEvents[K] | any} args - The arguments to pass to the event handler.
   * @returns The return value is a boolean that indicates whether the event was emitted.
   */
  public override emit<K extends keyof ClientEvents>(
    eventName: K | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: ClientEvents[K] | any
  ): boolean {
    return super.emit(eventName, ...args);
  }

  /**
   * Given a list of intents, return the number that represents them
   * @param {(keyof typeof ClientIntents)[]} intents - An array of intents to be added to the client.
   * @returns The number of intents in the array.
   */
  private intentsToNumber(intents: (keyof typeof ClientIntents)[]) {
    let counter = 0;
    for (const i of intents) {
      counter += ClientIntents[i];
    }
    return counter;
  }

  /**
   * It sets up the WebSocket connection and listens for messages from Discord
   */
  private async setupWebSocket() {
    this.ws.on('message', (data) => {
      const parsedData = JSON.parse(data.toString());
      if (parsedData.s) this.sequence_number = parsedData.s;
      if (parsedData.op) this.hearbeat_responded = true;
      if (!parsedData.t && this.session_id !== '' && this.connection_closed) {
        this.hearbeat_responded = true;
        this.heartbeat_interval = parsedData.d.heartbeat_interval;
        this.ws.send(
          JSON.stringify({
            op: 6,
            d: {
              token: this.token,
              session_id: this.session_id,
              seq: this.sequence_number
            }
          })
        );
        this.connection_closed = false;
      }
      if (!parsedData.t && !this.heartbeat_interval) {
        this.hearbeat_responded = true;
        this.heartbeat_interval = parsedData.d.heartbeat_interval;
        this.ws.send(
          JSON.stringify({
            op: 2,
            d: {
              token: this.token,
              properties: {
                $os: process.platform,
                $browse: 'higa',
                $device: 'higa'
              },
              intents: this.intents
            }
          })
        );
      }
      this.emit('DEBUG', parsedData);
      if (parsedData.t == 'READY') this.session_id = parsedData.d.session_id;
      if (parsedData.t) this.handleEvent(parsedData.t, parsedData.d);
    });
  }

  /**
   * When a Gateway event is received, emit it to the client
   * @param {K | string} event - The event name.
   * @param {unknown} object - The object that was dispatched.
   */
  private handleEvent<K extends keyof ClientEvents>(
    event: K | string,
    object: unknown
  ) {
    if (event === 'THREAD_DELETE') {
      object = this.cache.channels.get(
        (<GatewayChannelDeleteDispatchData>object).id
      );
    }
    this.emit(event, object);
  }

  /**
   * Interact with the Discord Gateway to add a Presence to the Bot User
   * @param presence - New presence to set
   */
  public setStatus(presence: GatewayPresenceUpdateData) {
    this.ws.send(
      JSON.stringify({
        op: 3,
        d: presence
      })
    );
  }
}

export { Client, ClientEvents, ClientOptions, ClientIntents, APIVersions };
