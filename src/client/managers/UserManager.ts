import axios from 'axios';
import {
  RESTGetAPICurrentUserGuildsQuery,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPICurrentUserResult,
  RESTGetAPIUserResult,
  RESTPatchAPICurrentUserJSONBody,
  RESTPatchAPICurrentUserResult
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
