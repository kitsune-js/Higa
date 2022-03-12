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
  RESTPostAPICurrentUserCreateDMChannelResult
} from 'discord-api-types/v9';
import { APIVersions } from '../..';

class UserManager {
  /**
   * Bot's token
   */
  private token: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param version - API Version
   */
  constructor(token: string, version: APIVersions) {
    this.token = token;
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
          Authorization: 'Bot ' + this.token,
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
          Authorization: 'Bot ' + this.token,
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
          Authorization: 'Bot ' + this.token,
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
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }
}

export { UserManager };
