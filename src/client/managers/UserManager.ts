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
   * Get user
   * @param userID - User Identifiant
   * @returns - User Object
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
   * Modify the current user
   * @param options - Option to modify current user
   * @returns - User Object
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
   * Get current user guilds
   * @param options - Option to get current user guilds
   * @returns - List of Guilds Object
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
   * Get current user guild member
   * @param guildID - Guild Identifiant
   * @returns - Member Object
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
   * Leave a guild
   * @param guildID - Guild Identifiant
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
   * Create a DM channel
   * @param options - Options to create a DM channel
   * @returns - DM Channel Object
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
   * Create a DM Group
   * @param options - Options to create a DM group
   * @see {@link https://discord.com/developers/docs/resources/user#create-group-dm}
   * @returns - DM Group Object
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
   * Get user connections
   * @returns - List of User Connection
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
