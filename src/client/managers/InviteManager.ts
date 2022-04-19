import axios from 'axios';

import { APIVersions } from '../..';
import { Invite } from '../../structures';

interface GetInviteOptions {
  with_counts?: boolean;
  with_expiration?: boolean;
  guild_scheduled_event_id?: string;
}

class InviteManager {
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
   * Get an invitation
   * @param code - Invite Code
   * @param options - Options for the query string
   * @returns - Invite Object
   */
  public async getInvite(
    code: string,
    options: GetInviteOptions = {}
  ): Promise<Invite> {
    const res = await axios.get<Invite>(
      `https://discord.com/api/v${this.version}/invites/${code}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
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
   * Remove an invitation
   * @param code - Invite Code
   * @param reason - Reason for the deletion
   * @returns - Invite Object
   */
  public async deleteInvite(code: string, reason?: string): Promise<Invite> {
    const res = await axios.delete<Invite>(
      `https://discord.com/api/v${this.version}/invites/${code}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
    return res.data;
  }
}

export { InviteManager, GetInviteOptions };
