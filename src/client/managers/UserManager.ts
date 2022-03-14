import axios from 'axios';
import {
  RESTGetAPICurrentUserGuildsQuery,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPICurrentUserResult,
  RESTGetAPIUserResult,
  RESTPatchAPICurrentUserJSONBody,
  RESTPatchAPICurrentUserResult,
  APIGuildMember,
  RESTPostAPICurrentUserCreateDMChannelJSONBody,
  RESTPostAPICurrentUserCreateDMChannelResult,
  APIGroupDMChannel,
  RESTGetAPICurrentUserConnectionsResult
} from 'discord-api-types/v9';
import { APIVersions } from '../..';

class UserManager {
  /**
   * Bot's token
   */
  private token: string;

  /**
   * Token type
   */
  private readonly tokenType: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param version - API Version
   */
  constructor(token: string, tokenType: string, version: APIVersions) {
    this.token = token;
    this.tokenType = tokenType;
    this.version = version;
  }

  /**
   * Get current user
   * @returns - User Object
   */
  async getCurrentUser(): Promise<RESTGetAPICurrentUserResult> {
    const res = await axios.get<RESTGetAPICurrentUserResult>(
      `https://discord.com/api/v${this.version}/users/@me`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
  async getUser(userID: string): Promise<RESTGetAPIUserResult> {
    const res = await axios.get<RESTGetAPIUserResult>(
      `https://discord.com/api/v${this.version}/users/${userID}`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
   * @param {RESTPatchAPICurrentUserJSONBody} options - Option to modify current user
   * @returns User
   */
  async modifyCurrentUser(
    options: RESTPatchAPICurrentUserJSONBody
  ): Promise<RESTPatchAPICurrentUserResult> {
    const res = await axios.patch<RESTPatchAPICurrentUserResult>(
      `https://discord.com/api/v${this.version}/users/@me`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
    options: RESTGetAPICurrentUserGuildsQuery
  ): Promise<RESTGetAPICurrentUserGuildsResult> {
    const res = await axios.get<RESTGetAPICurrentUserGuildsResult>(
      `https://discord.com/api/v${this.version}/users/@me/guilds`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }

  /**
   * Get the current user's guild member object
   * @param {string} guildID - The ID of the guild you want to get the member of.
   * @returns The guild member object.
   */
  async getCurrentUserGuildMember(guildID: string): Promise<APIGuildMember> {
    const res = await axios.get<APIGuildMember>(
      `https://discord.com/api/v${this.version}/users/@me/guilds/${guildID}/member`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
    await axios.delete(
      `https://discord.com/api/v${this.version}/users/@me/guilds/${guildID}`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
  async createDM(
    options: RESTPostAPICurrentUserCreateDMChannelJSONBody
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    const res = await axios.post(
      `https://discord.com/api/v${this.version}/users/@me/channels`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
  async createGroupDM(options: {
    access_tokens: string[];
    nicks: { [userID: string]: string };
  }): Promise<APIGroupDMChannel> {
    const res = await axios.post(
      `https://discord.com/api/v${this.version}/users/@me/channels`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
  async getUserConnections(): Promise<RESTGetAPICurrentUserConnectionsResult> {
    const res = await axios.get<RESTGetAPICurrentUserConnectionsResult>(
      `https://discord.com/api/v${this.version}/users/@me/connections`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
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
