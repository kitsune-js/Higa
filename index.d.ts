import { EventEmitter } from 'node:events';
import { APIChannel, APIMessage } from 'discord-api-types';

declare module 'higa';

export interface ClientEvents {
  READY: [];
  MESSAGE_CREATE: [message: APIMessage];
  DEBUG: [...data: unknown];
}

export type Awaitable<T> = T | PromiseLike<T>;

export class DiscordClient extends EventEmitter {
  constructor(token?: string, debug?: boolean): void;

  async setupBebSocket(): void;

  on<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => Awataible<void>
  ): this;

  public setStatus(
    status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline',
    activities: GatewayActivityUpdateData[]
  ): void;

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
