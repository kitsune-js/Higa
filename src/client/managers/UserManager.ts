import axios from 'axios';
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPIUserResult,
  RESTPatchAPICurrentUserJSONBody,
  RESTPatchAPICurrentUserResult
} from 'discord-api-types/v9';

class UserManager {
  /**
   * Bot's token
   */
  private token: string;

  /**
   * @param token - Bot's token
   */
  constructor(token: string) {
    this.token = token;
  }

  async getCurrentUser(): Promise<RESTGetAPICurrentUserResult> {
    const res = await axios.get<RESTGetAPICurrentUserResult>(
      `https://discord.com/api/v9/users/@me`,
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
      `https://discord.com/api/v9/users/${userID}`,
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
      `https://discord.com/api/v9/users/@me`,
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
}

export { UserManager };
