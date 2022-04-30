import {
  EventEmitter,
  GatewayChannelDeleteDispatchData,
  GatewayPresenceUpdateData
} from '../dep.ts';
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
} from '../structures/index.ts';
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
  VoiceManager,
  WebhookManager,
  InteractionManager,
  StickerManager
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
  READY: (client: Application) => void;
  DEBUG: any;
  CHANNEL_CREATE: (channel: Channel) => void;
  CHANNEL_UPDATE: (channelBefore: Channel, channelAfter: Channel) => void;
  CHANNEL_DELETE: (channel: Channel) => void;
  THREAD_CREATE: (thread: Channel) => void;
  THREAD_UPDATE: (threadBefore: Channel, threadAfter: Channel) => void;
  THREAD_DELETE: (thread: Channel) => void;
  THREAD_LIST_SYNC: (data: ThreadListSyncData) => void;
  THREAD_MEMBER_UPDATE: (member: ThreadMember & { guild_id: string }) => void;
  THREAD_MEMBERS_UPDATE: (data: ThreadMembersUpdateData) => void;
  CHANNEL_PINS_UPDATE: (data: ChannelPinsUpdateData) => void;
  GUILD_CREATE: (guild: Guild) => void;
  GUILD_UPDATE: (guildBefore: Guild, guildAfter: Guild) => void;
  GUILD_DELETE: (guild: Guild) => void;
  GUILD_BAN_ADD: (data: GuildBanData) => void;
  GUILD_BAN_REMOVE: (data: GuildBanData) => void;
  GUILD_EMOJIS_UPDATE: (data: GuildEmojisUpdateData) => void;
  GUILD_STICKERS_UPDATE: (data: GuildStickersUpdateData) => void;
  GUILD_INTEGRATIONS_UPDATE: (data: GuildIntegrationsUpdateData) => void;
  GUILD_MEMBER_ADD: (member: GuildMember & { guild_id: string }) => void;
  GUILD_MEMBER_REMOVE: (data: GuildMemberRemoveData) => void;
  GUILD_MEMBER_UPDATE: (
    memberBefore: GuildMemberUpdateData,
    memberAfter: GuildMemberUpdateData
  ) => void;
  GUILD_ROLE_CREATE: (data: GuildRoleCreateData) => void;
  GUILD_ROLE_UPDATE: (roleBefore: Role, data: GuildRoleCreateData) => void;
  GUILD_ROLE_DELETE: (role: Role) => void;
  GUILD_SCHEDULED_EVENT_CREATE: (
    guildScheduledEvent: GuildScheduledEvent
  ) => void;
  GUILD_SCHEDULED_EVENT_UPDATE: (
    guildScheduledEventBefore: GuildScheduledEvent,
    guildScheduledEventAfter: GuildScheduledEvent
  ) => void;
  GUILD_SCHEDULED_EVENT_DELETE: (
    guildScheduledEvent: GuildScheduledEvent
  ) => void;
  GUILD_SCHEDULED_EVENT_USER_ADD: (data: GuildScheduledEventUserData) => void;
  GUILD_SCHEDULED_EVENT_USER_REMOVE: (
    data: GuildScheduledEventUserData
  ) => void;
  INTEGRATION_CREATE: (integration: Integration & { guild_id: string }) => void;
  INTEGRATION_UPDATE: (integration: Integration & { guild_id: string }) => void;
  INTEGRATION_DELETE: (data: InteractionDeleteData) => void;
  INVITE_CREATE: (invite: InviteCreateData) => void;
  INVITE_DELETE: (invite: InviteDeleteData) => void;
  MESSAGE_CREATE: (message: Message) => void;
  MESSAGE_UPDATE: (messageBefore: Message, messageAfter: Message) => void;
  MESSAGE_DELETE: (message: Message) => void;
  MESSAGE_DELETE_BULK: (data: MessageDeleteBulkData) => void;
  MESSAGE_REACTION_ADD: (reaction: MessageReactionData) => void;
  MESSAGE_REACTION_REMOVE: (reaction: MessageReactionData) => void;
  MESSAGE_REACTION_REMOVE_ALL: (data: MessageReactionRemoveAllData) => void;
  MESSAGE_REACTION_REMOVE_EMOJI: (data: MessageReactionRemoveEmojiData) => void;
  PRESENCE_UPDATE: (presence: PresenceData) => void;
  TYPING_START: (data: TypingData) => void;
  USER_UPDATE: (user: User) => void;
  VOICE_STATE_UPDATE: (voiceState: VoiceState) => void;
  VOICE_SERVER_UPDATE: (data: VoiceServerData) => void;
  WEBHOOKS_UPDATE: (data: WebhooksData) => void;
  INTERACTION_CREATE: (interaction: Interaction) => void;
  STAGE_INSTANCE_CREATE: (stageInstance: StageInstance) => void;
  STAGE_INSTANCE_UPDATE: (stageInstance: StageInstance) => void;
  STAGE_INSTANCE_DELETE: (stageInstance: StageInstance) => void;
}

type APIVersions = '6' | '7' | '8' | '9';

interface ClientOptions {
  token: string;
  tokenType: 'Bearer' | 'Bot';
  intents?: (keyof typeof ClientIntents)[];
  version?: APIVersions;
  wsConnection?: boolean;
  applicationId?: string;
}

class Client extends EventEmitter<ClientEvents> {
  /**
   * Application's token
   * @private
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

  public interaction: InteractionManager;

  /**
   * Invite Manager to interact with the REST API
   */
  public invite: InviteManager;

  /**
   * Sticker Manager to interact with the REST API
   */
  public sticker: StickerManager;

  /**
   * User Manager to interact with the REST API
   */
  public user: UserManager;

  /**
   * Voice Manager to interact with the REST API
   */
  public voice: VoiceManager;

  /**
   * Webhook Manager to interact with the REST API
   */
  public webhook: WebhookManager;

  /**
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

    this.applicationCommand = new ApplicationCommandManager(
      this.token,
      this.tokenType,
      this.version
    );
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
    this.emoji = new EmojiManager(this.token, this.tokenType, this.version);
    this.guild = new GuildManager(this.token, this.tokenType, this.version);
    this.guildScheduledEvent = new GuildScheduledEventManager(
      this.token,
      this.tokenType,
      this.version
    );
    this.invite = new InviteManager(this.token, this.tokenType, this.version);
    this.sticker = new StickerManager(this.token, this.tokenType, this.version);
    this.user = new UserManager(this.token, this.tokenType, this.version);
    this.voice = new VoiceManager(this.token, this.tokenType, this.version);
    this.webhook = new WebhookManager(this.token, this.tokenType, this.version);
    if (options.applicationId) {
      this.interaction = new InteractionManager(
        options.applicationId,
        this.version
      );
    } else {
      this.interaction = new InteractionManager('', this.version);
      this.user
        .getCurrentUser()
        .then(
          (user) =>
            (this.interaction = new InteractionManager(user.id, this.version))
        );
    }
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
export type {
  ClientEvents,
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
