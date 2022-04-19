import {
  APIApplication,
  APIChannel,
  APIMessage,
  EventEmitter,
  GatewayChannelDeleteDispatchData,
  GatewayPresenceUpdateData
} from '../dep.ts';
import {
  AuditLogManager,
  CacheManager,
  ChannelManager,
  InviteManager,
  UserManager,
  VoiceManager
} from './managers/index.ts';

/* It's a constant that contains all the intents the bot can listen to. */
const ClientIntents = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_BANS: 1 << 2,
  GUILD_EMOJIS_AND_STICKERS: 1 << 3,
  GUILD_INTEGRATIONS: 1 << 4,
  GUILD_WEBHOOKS: 1 << 5,
  GUILD_INVITES: 1 << 6,
  GUILD_VOICE_STATES: 1 << 7,
  GUILD_PRESENCES: 1 << 8,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  GUILD_MESSAGE_TYPING: 1 << 11,
  DIRECT_MESSAGES: 1 << 12,
  DIRECT_MESSAGE_REACTIONS: 1 << 13,
  DIRECT_MESSAGE_TYPING: 1 << 14,
  GUILD_SCHEDULED_EVENTS: 1 << 16
};

interface ClientEvents {
  READY: (client: APIApplication) => void;
  MESSAGE_CREATE: (message: APIMessage) => void;
  // deno-lint-ignore no-explicit-any
  DEBUG: (args: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  THREAD_CREATE: (thread: APIChannel) => void;
  THREAD_DELETE: (thread: APIChannel) => void;
}

type APIVersions = '6' | '7' | '8' | '9';

interface ClientOptions {
  token: string;
  tokenType: 'Bearer' | 'Bot';
  intents?: (keyof typeof ClientIntents)[];
  version?: APIVersions;
  wsConnection?: boolean;
}

class Client extends EventEmitter<ClientEvents> {
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
  private ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
  private heartbeat_interval = 0;
  private hearbeat_responded = false;
  private connection_closed = false;
  private sequence_number: number | null = null;
  private session_id = '';

  /**
   * Application's cache
   */
  private cache_ = new CacheManager();

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

    this.on('READY', () => {
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
      this.cache_,
      this.version
    );
    this.invite = new InviteManager(this.token, this.tokenType, this.version);
    this.user = new UserManager(this.token, this.tokenType, this.version);
    this.voice = new VoiceManager(this.token, this.tokenType, this.version);
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
  private setupWebSocket() {
    this.ws.onmessage = (message) => {
      const parsedData = JSON.parse(message.data);
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
        console.log(
          JSON.stringify({
            op: 2,
            d: {
              token: this.token,
              properties: {
                $os: Deno.build.os,
                $browse: 'higa',
                $device: 'higa'
              },
              intents: this.intents
            }
          })
        );
        this.ws.send(
          JSON.stringify({
            op: 2,
            d: {
              token: this.token,
              properties: {
                $os: Deno.build.os,
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
    };
  }

  /**
   * When a Gateway event is received, emit it to the client
   * @param {K | string} event - The event name.
   * @param {unknown} object - The object that was dispatched.
   */
  private handleEvent<K extends keyof ClientEvents>(event: K, object: unknown) {
    if (event === 'THREAD_DELETE') {
      object = this.cache_.channels.get(
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

export { Client, ClientIntents };
export type { ClientEvents, ClientOptions, APIVersions };
