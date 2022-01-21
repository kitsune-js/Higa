import { EventEmitter } from 'node:events';
import {
  RESTGetAPIChannelMessagesQuery,
  APIChannel,
  APIMessage,
  GatewayPresenceUpdateData,
  RESTPatchAPIChannelJSONBody
} from 'discord-api-types';

declare module 'higa';

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

export interface ClientEvents {
  READY: [];
  MESSAGE_CREATE: [message: APIMessage];
  DEBUG: [...data: unknown];
}

export type Awaitable<T> = T | PromiseLike<T>;

class ChannelManager {
  constructor(token: string, cache: typeof CacheManager): void;

  public async getChannel(id: string): Promise<APIChannel>;

  public async modifyChannel(
    id: string,
    options: RESTPatchAPIChannelJSONBody,
    reason?: string
  ): Promise<APIChannel>;

  public async deleteChannel(id: string, reason?: string): Promise<APIChannel>;

  public async getChannelMessages(
    id: string,
    options?: RESTGetAPIChannelMessagesQuery
  ): Promise<APIMessage[]>;

  public async getChannelMessage(
    channelID: string,
    messageID: string
  ): Promise<APIMessage>;
}

export class Client extends EventEmitter {
  constructor(
    token?: string,
    intents: (keyof typeof ClientIntents)[] = []
  ): void;

  public readonly intents: number;

  public channel: ChannelManager;

  on<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => Awataible<void>
  ): this;

  public setStatus(presence: GatewayPresenceUpdateData): void;

  /**
   * Create a DM channel with someone and return it
   */
  public createDM(user: string): Promise<APIChannel>;

  /**
   * Send a message in a channel (only text)
   */
  public sendMessage(channel: string, content: string): APIMessage;

  /**
   * Reply to a message in a given channel (only text)
   */
  public replyToMessage(
    channel: string,
    message: string,
    content: string
  ): APIMessage;
}
