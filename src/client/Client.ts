import { GatewayPresenceUpdateData } from 'discord-api-types/gateway';
import { EventEmitter } from 'node:events';
import WebSocket from 'ws';

import {
  ApplicationCommandManager,
  AuditLogManager,
  CacheManager,
  ChannelManager,
  EmojiManager,
  GuildManager,
  GuildScheduledEventManager,
  InviteManager,
  UserManager,
  VoiceManager
} from '.';
import {
  Activity,
  Application,
  Channel,
  ClientStatus,
  Emoji,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  Integration,
  Interaction,
  InviteTargetType,
  Message,
  Role,
  StageInstance,
  StatusType,
  Sticker,
  ThreadMember,
  User,
  VoiceState
} from '../structures';

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

interface ThreadListSyncData {
  guild_id: string;
  channel_ids?: string[];
  threads: Channel[];
  members: ThreadMember[];
}

interface ThreadMembersUpdateData {
  id: string;
  guild_id: string;
  member_count: number;
  added_members: ThreadMember[];
  removed_member_ids: string[];
}

interface ChannelPinsUpdateData {
  guild_id?: string;
  channel_id: string;
  last_pin_timestamp?: string;
}

interface GuildBanData {
  guild_id: string;
  user: User;
}

interface GuildEmojisUpdateData {
  guild_id: string;
  emojis: Emoji[];
}

interface GuildStickersUpdateData {
  guild_id: string;
  emojis: Sticker[];
}

interface GuildIntegrationsUpdateData {
  guild_id: string;
}

interface GuildMemberRemoveData {
  guild_id: string;
  user: User;
}

interface GuildMemberUpdateData {
  guild_id: string;
  user: User;
  roles: string[];
  nick?: string;
  avatar?: string;
  joined_at?: string;
  premium_since?: string;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  communication_disabled_until?: number;
}

interface GuildRoleCreateData {
  guild_id: string;
  role: Role;
}

interface GuildRoleDeleteData {
  guild_id: string;
  role_id: string;
}

interface GuildScheduledEventUserData {
  guild_scheduled_event_id: string;
  guild_id: string;
  user_id: string;
}

interface InteractionDeleteData {
  id: string;
  guild_id: string;
  application_id?: string;
}

interface InviteCreateData {
  channel_id: string;
  code: string;
  created_at: string;
  guild_id?: string;
  inviter?: User;
  max_age: number;
  max_uses: number;
  target_type?: InviteTargetType;
  target_user?: User;
  target_application?: Application;
  temporary: boolean;
  uses: number;
}

interface InviteDeleteData {
  channel_id: string;
  code: string;
  guild_id?: string;
}

interface MessageDeleteBulkData {
  guild_id?: string;
  channel_id: string;
  ids: string[];
}

interface MessageReactionData {
  user_id: string;
  channel_id: string;
  message_id: string;
  guild_id?: string;
  emoji: Emoji;
  member?: GuildMember;
}

interface MessageReactionRemoveAllData {
  channel_id: string;
  message_id: string;
  guild_id?: string;
}

interface MessageReactionRemoveEmojiData {
  channel_id: string;
  message_id: string;
  guild_id?: string;
  emoji: Emoji;
}

interface PresenceData {
  user: User;
  guild_id: string;
  status: StatusType;
  activities: Activity[];
  client_status: ClientStatus;
}

interface TypingData {
  channel_id: string;
  guild_id?: string;
  user_id: string;
  timestamp: string;
  member?: GuildMember;
}

interface VoiceServerData {
  token: string;
  guild_id: string;
  endpoint?: string;
}

interface WebhooksData {
  guild_id: string;
  channel_id: string;
}

interface ClientEvents {
  READY: [client: Application];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DEBUG: any;
  CHANNEL_CREATE: [channel: Channel];
  CHANNEL_UPDATE: [channelBefore: Channel, channelAfter: Channel];
  CHANNEL_DELETE: [channel: Channel];
  THREAD_CREATE: [thread: Channel];
  THREAD_UPDATE: [threadBefore: Channel, threadAfter: Channel];
  THREAD_DELETE: [thread: Channel];
  THREAD_LIST_SYNC: [data: ThreadListSyncData];
  THREAD_MEMBER_UPDATE: [member: ThreadMember & { guild_id: string }];
  THREAD_MEMBERS_UPDATE: [data: ThreadMembersUpdateData];
  CHANNEL_PINS_UPDATE: [data: ChannelPinsUpdateData];
  GUILD_CREATE: [guild: Guild];
  GUILD_UPDATE: [guildBefore: Guild, guildAfter: Guild];
  GUILD_DELETE: [guild: Guild];
  GUILD_BAN_ADD: [data: GuildBanData];
  GUILD_BAN_REMOVE: [data: GuildBanData];
  GUILD_EMOJIS_UPDATE: [data: GuildEmojisUpdateData];
  GUILD_STICKERS_UPDATE: [data: GuildStickersUpdateData];
  GUILD_INTEGRATIONS_UPDATE: [data: GuildIntegrationsUpdateData];
  GUILD_MEMBER_ADD: [member: GuildMember & { guild_id: string }];
  GUILD_MEMBER_REMOVE: [data: GuildMemberRemoveData];
  GUILD_MEMBER_UPDATE: [
    memberBefore: GuildMemberUpdateData,
    memberAfter: GuildMemberUpdateData
  ];
  GUILD_ROLE_CREATE: [data: GuildRoleCreateData];
  GUILD_ROLE_UPDATE: [roleBefore: Role, data: GuildRoleCreateData];
  GUILD_ROLE_DELETE: [role: Role];
  GUILD_SCHEDULED_EVENT_CREATE: [guildScheduledEvent: GuildScheduledEvent];
  GUILD_SCHEDULED_EVENT_UPDATE: [
    guildScheduledEventBefore: GuildScheduledEvent,
    guildScheduledEventAfter: GuildScheduledEvent
  ];
  GUILD_SCHEDULED_EVENT_DELETE: [guildScheduledEvent: GuildScheduledEvent];
  GUILD_SCHEDULED_EVENT_USER_ADD: [data: GuildScheduledEventUserData];
  GUILD_SCHEDULED_EVENT_USER_REMOVE: [data: GuildScheduledEventUserData];
  INTEGRATION_CREATE: [integration: Integration & { guild_id: string }];
  INTEGRATION_UPDATE: [integration: Integration & { guild_id: string }];
  INTEGRATION_DELETE: [data: InteractionDeleteData];
  INVITE_CREATE: [invite: InviteCreateData];
  INVITE_DELETE: [invite: InviteDeleteData];
  MESSAGE_CREATE: [message: Message];
  MESSAGE_UPDATE: [messageBefore: Message, messageAfter: Message];
  MESSAGE_DELETE: [message: Message];
  MESSAGE_DELETE_BULK: [data: MessageDeleteBulkData];
  MESSAGE_REACTION_ADD: [reaction: MessageReactionData];
  MESSAGE_REACTION_REMOVE: [reaction: MessageReactionData];
  MESSAGE_REACTION_REMOVE_ALL: [data: MessageReactionRemoveAllData];
  MESSAGE_REACTION_REMOVE_EMOJI: [data: MessageReactionRemoveEmojiData];
  PRESENCE_UPDATE: [presence: PresenceData];
  TYPING_START: [data: TypingData];
  USER_UPDATE: [user: User];
  VOICE_STATE_UPDATE: [voiceState: VoiceState];
  VOICE_SERVER_UPDATE: [data: VoiceServerData];
  WEBHOOKS_UPDATE: [data: WebhooksData];
  INTERACTION_CREATE: [interaction: Interaction];
  STAGE_INSTANCE_CREATE: [stageInstance: StageInstance];
  STAGE_INSTANCE_UPDATE: [stageInstance: StageInstance];
  STAGE_INSTANCE_DELETE: [stageInstance: StageInstance];
}

type APIVersions = '6' | '7' | '8' | '9' | '10';

interface ClientOptions {
  token: string;
  tokenType: 'Bearer' | 'Bot';
  intents?: (keyof typeof ClientIntents)[];
  version?: APIVersions;
  wsConnection?: boolean;
}

class Client extends EventEmitter {
  /**
   * Application's token
   * @private
   */
  readonly #token: string;

  /**
   * Token type
   * @private
   */
  readonly #tokenType: 'Bearer' | 'Bot' | '';

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
   * @private
   */
  #ws: WebSocket = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
  #heartbeat_interval = 0;
  #hearbeat_responded = false;
  #connection_closed = false;
  #sequence_number: number | null = null;
  #session_id = '';

  /**
   * Application's cache
   * @private
   */
  #cache = new CacheManager();

  /**
   * Application Command Manager to interact with the REST API
   */
  public readonly applicationCommand: ApplicationCommandManager;

  /**
   * Audit Log Manager to interact with the REST API
   */
  public auditLog: AuditLogManager;

  /**
   * Channel Manager to interact with the REST API
   */
  public channel: ChannelManager;

  /**
   * Emoji Manager to interact with the REST API
   */
  public emoji: EmojiManager;

  /**
   * Guild Manager to interact with the REST API
   */
  public guild: GuildManager;

  /**
   * Guild Scheduled Event Manager to interact with the REST API
   */
  public guildScheduledEvent: GuildScheduledEventManager;

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
    this.#token = options.token;
    this.#tokenType = options.tokenType;

    if (options.wsConnection === undefined || this.#tokenType !== 'Bot')
      options.wsConnection = true;

    if (options.wsConnection) this.setupWebSocket();

    if (!options.intents) options.intents = [];

    this.intents = this.intentsToNumber(options.intents);

    if (!options.version) options.version = '9';

    this.version = options.version;

    this.once('READY', () => {
      setInterval(() => {
        if (this.#hearbeat_responded) {
          this.#ws.send(
            JSON.stringify({
              op: 1,
              d: this.#sequence_number
            })
          );
          this.#hearbeat_responded = false;
        } else {
          this.#ws.close();
          this.#connection_closed = true;
          this.#ws = new WebSocket(
            `wss://gateway.discord.gg/?v=${this.version}&encoding=json'`
          );
          this.setupWebSocket();
        }
      }, this.#heartbeat_interval);
    });

    this.applicationCommand = new ApplicationCommandManager(
      this.#token,
      this.#tokenType,
      this.version
    );
    this.auditLog = new AuditLogManager(
      this.#token,
      this.#tokenType,
      this.version
    );
    this.channel = new ChannelManager(
      this.#token,
      this.#tokenType,
      this.#cache,
      this.version
    );
    this.emoji = new EmojiManager(this.#token, this.#tokenType, this.version);
    this.guild = new GuildManager(this.#token, this.#tokenType, this.version);
    this.guildScheduledEvent = new GuildScheduledEventManager(
      this.#token,
      this.#tokenType,
      this.version
    );
    this.invite = new InviteManager(this.#token, this.#tokenType, this.version);
    this.user = new UserManager(this.#token, this.#tokenType, this.version);
    this.voice = new VoiceManager(this.#token, this.#tokenType, this.version);
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
    eventName: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: ClientEvents[K]
  ): boolean {
    return super.emit(eventName, ...(<unknown[]>args));
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
    this.#ws.on('message', (data) => {
      const parsedData = JSON.parse(data.toString());
      if (parsedData.s) this.#sequence_number = parsedData.s;
      if (parsedData.op) this.#hearbeat_responded = true;
      if (!parsedData.t && this.#session_id !== '' && this.#connection_closed) {
        this.#hearbeat_responded = true;
        this.#heartbeat_interval = parsedData.d.heartbeat_interval;
        this.#ws.send(
          JSON.stringify({
            op: 6,
            d: {
              token: this.#token,
              session_id: this.#session_id,
              seq: this.#sequence_number
            }
          })
        );
        this.#connection_closed = false;
      }
      if (!parsedData.t && !this.#heartbeat_interval) {
        this.#hearbeat_responded = true;
        this.#heartbeat_interval = parsedData.d.heartbeat_interval;
        this.#ws.send(
          JSON.stringify({
            op: 2,
            d: {
              token: this.#token,
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
      if (parsedData.t == 'READY') this.#session_id = parsedData.d.session_id;
      if (parsedData.t) this.handleEvent(parsedData.t, parsedData.d);
    });
  }

  /**
   * When a Gateway event is received, emit it to the client
   * @param {K | string} event - The event name.
   * @param {unknown} object - The object that was dispatched.
   */
  private handleEvent<K extends keyof ClientEvents>(event: K, object: unknown) {
    if (event === 'CHANNEL_CREATE' || event === 'THREAD_CREATE') {
      this.#cache.channels.set((<Channel>object).id, <Channel>object);
    } else if (event === 'CHANNEL_UPDATE' || event === 'THREAD_UPDATE') {
      const before = <Channel>this.#cache.channels.get((<Channel>object).id);
      const after = <Channel>object;
      this.#cache.channels.set(after.id, after);
      return this.emit(event, before, after);
    } else if (event === 'CHANNEL_DELETE' || event === 'THREAD_DELETE') {
      object = this.#cache.channels.get((<Channel>object).id);
      this.#cache.channels.delete((<Channel>object).id);
    } else if (event === 'GUILD_CREATE') {
      this.#cache.guilds.set((<Guild>object).id, <Guild>object);
    } else if (event === 'GUILD_UPDATE') {
      const before = <Guild>this.#cache.guilds.get((<Guild>object).id);
      const after = <Guild>object;
      this.#cache.guilds.set(after.id, after);
      return this.emit(event, before, after);
    } else if (event === 'GUILD_DELETE') {
      object = this.#cache.guilds.get((<Guild>object).id);
      this.#cache.guilds.delete((<Guild>object).id);
    } else if (event === 'GUILD_MEMBER_ADD') {
      this.#cache.guildMembers.set(
        [
          (<GuildMemberUpdateData>object).user.id,
          (<GuildMemberUpdateData>object).guild_id
        ],
        <GuildMember & { guild_id: string }>object
      );
    } else if (event === 'GUILD_MEMBER_UPDATE') {
      const before = <GuildMemberUpdateData>(
        (<unknown>(
          this.#cache.guildMembers.get([
            (<GuildMemberUpdateData>object).user.id,
            (<GuildMemberUpdateData>object).guild_id
          ])
        ))
      );
      const after = <GuildMemberUpdateData>object;
      this.#cache.guildMembers.set(
        [after.user.id, after.guild_id],
        <GuildMember & { guild_id: string }>(<unknown>after)
      );
      return this.emit(event, before, after);
    } else if (event === 'GUILD_MEMBER_REMOVE') {
      object = this.#cache.guildMembers.get([
        (<GuildMemberUpdateData>object).user.id,
        (<GuildMemberUpdateData>object).guild_id
      ]);
      this.#cache.guildMembers.delete([
        (<GuildMemberUpdateData>object).user.id,
        (<GuildMemberUpdateData>object).guild_id
      ]);
    } else if (event === 'GUILD_ROLE_CREATE') {
      this.#cache.roles.set(
        (<GuildRoleCreateData>object).role.id,
        (<GuildRoleCreateData>object).role
      );
    } else if (event === 'GUILD_ROLE_UPDATE') {
      const before = <Role>(
        this.#cache.roles.get((<GuildRoleCreateData>object).role.id)
      );
      const after = <GuildRoleCreateData>object;
      this.#cache.roles.set(before.id, after.role);
      return this.emit(event, before, after);
    } else if (event === 'GUILD_ROLE_DELETE') {
      object = this.#cache.roles.get((<GuildRoleDeleteData>object).role_id);
      this.#cache.roles.delete((<GuildRoleDeleteData>object).role_id);
    } else if (event === 'GUILD_SCHEDULED_EVENT_CREATE') {
      this.#cache.guildScheduledEvents.set(
        (<GuildScheduledEvent>object).id,
        <GuildScheduledEvent>object
      );
    } else if (event === 'GUILD_SCHEDULED_EVENT_UPDATE') {
      const before = <GuildScheduledEvent>(
        this.#cache.guildScheduledEvents.get((<GuildScheduledEvent>object).id)
      );
      const after = <GuildScheduledEvent>object;
      this.#cache.guildScheduledEvents.set(after.id, after);
      return this.emit(event, before, after);
    } else if (event === 'GUILD_SCHEDULED_EVENT_DELETE') {
      this.#cache.guildScheduledEvents.delete((<GuildScheduledEvent>object).id);
    } else if (event === 'MESSAGE_CREATE') {
      this.#cache.messages.set((<Message>object).id, <Message>object);
    } else if (event === 'MESSAGE_UPDATE') {
      const before = <Message>this.#cache.messages.get((<Message>object).id);
      const after = <Message>object;
      this.#cache.messages.set(after.id, after);
      return this.emit(event, before, after);
    } else if (event === 'MESSAGE_DELETE') {
      object = this.#cache.messages.get((<Message>object).id);
      this.#cache.messages.delete((<Message>object).id);
    }

    this.emit(event, object);
  }

  /**
   * Interact with the Discord Gateway to add a Presence to the Bot User
   * @param presence - New presence to set
   */
  public setStatus(presence: GatewayPresenceUpdateData) {
    this.#ws.send(
      JSON.stringify({
        op: 3,
        d: presence
      })
    );
  }
}

export {
  Client,
  ClientEvents,
  ClientIntents,
  ClientOptions,
  APIVersions,
  ThreadListSyncData,
  ThreadMembersUpdateData,
  ChannelPinsUpdateData,
  GuildBanData,
  GuildEmojisUpdateData,
  GuildStickersUpdateData,
  GuildIntegrationsUpdateData,
  GuildMemberRemoveData,
  GuildMemberUpdateData,
  GuildRoleCreateData,
  GuildRoleDeleteData,
  GuildScheduledEventUserData
};
