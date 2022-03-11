import axios from 'axios';
import {
  RESTDeleteAPIInviteResult,
  RESTGetAPIInviteQuery,
  RESTGetAPIInviteResult
} from 'discord-api-types/v9';
import { APIVersions } from '../..';

class InviteManager {
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
   * Get an invitation
   * @param code - Invite Code
   * @param options - Options for the query string
   * @returns - Invite Object
   */
  public async getInvite(
    code: string,
    options?: RESTGetAPIInviteQuery
  ): Promise<RESTGetAPIInviteResult> {
    const res = await axios.get<RESTGetAPIInviteResult>(
      `https://discord.com/api/v${this.version}/invites/${code}`,
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

  /**
   * Remove an invitation
   * @param code - Invite Code
   * @param reason - Reason for the deletion
   * @returns - Invite Object
   */
  public async deleteInvite(
    code: string,
    reason?: string
  ): Promise<RESTDeleteAPIInviteResult> {
    const res = await axios.delete<RESTDeleteAPIInviteResult>(
      `https://discord.com/api/v${this.version}/invites/${code}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
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

export { InviteManager };
