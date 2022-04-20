import { axiod, option } from '../../dep.ts';

import { APIVersions } from '../Client.ts';
import {
  Channel,
  Connection,
  Guild,
  GuildMember,
  User
} from '../../structures/index.ts';

interface ModifyUserOptions {
  username: string;
  avatar?: any;
}

interface GetCurrentUserGuildsOptions {
  limit?: number;
  after?: string;
  before?: string;
}

interface CreateDMOptions {
  recipient_id: string;
}

interface CreateGroupDMOptions {
  access_tokens: string[];
  nicks: { [id: string]: string };
}

class UserManager {
  /**
   * Bot's token
   */
  #token: string;

  /**
   * Token type
   */
  readonly #tokenType: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param version - API Version
   */
  constructor(token: string, tokenType: string, version: APIVersions) {
    this.#token = token;
    this.#tokenType = tokenType;
    this.version = version;
  }

  /**
   * Get current user
   * @returns - User Object
   */
  async getCurrentUser(): Promise<User> {
    const res = await axiod.get<User>(
      `https://discord.com/api/v${this.version}/users/@me`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * It makes a GET request to the Discord API to get the user with the given ID
   * @param {string} userID - The ID of the user you want to get.
   * @returns User
   */
  async getUser(userID: string): Promise<User> {
    const res = await axiod.get<User>(
      `https://discord.com/api/v${this.version}/users/${userID}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * It modifies the current user's data
   * @param {ModifyUserOptions} options - Option to modify current user
   * @returns User
   */
  async modifyCurrentUser(options: ModifyUserOptions): Promise<User> {
    const res = await axiod.patch<User>(
      `https://discord.com/api/v${this.version}/users/@me`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Get the current user's guilds
   * @param {RESTGetAPICurrentUserGuildsQuery} options - Option to get current user guilds
   * @returns Guilds' Array
   */
  async getCurrentUserGuilds(
    options: GetCurrentUserGuildsOptions
  ): Promise<Guild[]> {
    const res = await axiod.get<Guild[]>(
      `https://discord.com/api/v${this.version}/users/@me/guilds`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>options
      }
    );
    return res.data;
  }

  /**
   * Get the current user's guild member object
   * @param {string} guildID - The ID of the guild you want to get the member of.
   * @returns The guild member object.
   */
  async getCurrentUserGuildMember(guildID: string): Promise<GuildMember> {
    const res = await axiod.get<GuildMember>(
      `https://discord.com/api/v${this.version}/users/@me/guilds/${guildID}/member`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );

    return res.data;
  }

  /**
   * It leaves a guild.
   * @param {string} guildID - The ID of the guild you want to leave.
   */
  async leaveGuild(guildID: string): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/users/@me/guilds/${guildID}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  /**
   * Create a DM channel with another user
   * @param {RESTPostAPICurrentUserCreateDMChannelJSONBody} options - Options to create a DM channel
   * @returns DM Channel
   */
  async createDM(options: CreateDMOptions): Promise<Channel> {
    const res = await axiod.post<Channel>(
      `https://discord.com/api/v${this.version}/users/@me/channels`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * It creates a group DM channel with the users specified in the `access_tokens` array
   * @param options - Options to create a DM group
   * @see {@link https://discord.com/developers/docs/resources/user#create-group-dm}
   * @returns Group DM Channel
   */
  async createGroupDM(options: CreateGroupDMOptions): Promise<Channel> {
    const res = await axiod.post<Channel>(
      `https://discord.com/api/v${this.version}/users/@me/channels`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * It gets the current user's connections
   * @returns Connections' Array
   */
  async getUserConnections(): Promise<Connection> {
    const res = await axiod.get<Connection>(
      `https://discord.com/api/v${this.version}/users/@me/connections`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }
}

export { UserManager };
export type { ModifyUserOptions, CreateDMOptions, CreateGroupDMOptions };
