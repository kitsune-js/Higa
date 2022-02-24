import { RESTPatchAPICurrentUserJSONBody } from 'discord-api-types';
import { Manager } from './DefaultManager';

class UserManager extends Manager {
  /**
   * @param token - Bot's token
   */
  constructor(token: string) {
    super(token);
  }

  async getCurrentUser() {
    const res = await fetch(`https://discord.com/api/v9/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
      }
    });
    return await res.json();
  }

  async getUser(userID: string) {
    const res = await fetch(`https://discord.com/api/v9/users/${userID}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
      }
    });
    return await res.json();
  }

  async modifyCurrentUser(options: RESTPatchAPICurrentUserJSONBody) {
    const res = await fetch(`https://discord.com/api/v9/users/@me`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
      },
      body: JSON.stringify(options)
    });
    return await res.json();
  }
}

export { UserManager };
