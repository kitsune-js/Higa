import {
  RESTDeleteAPIInviteResult,
  RESTGetAPIInviteQuery,
  RESTGetAPIInviteResult
} from 'discord-api-types';
import fetch from 'node-fetch';
import { Manager } from './DefaultManager';

class InviteManager extends Manager {
  /**
   * @param token - Bot's token
   */
  constructor(token: string) {
    super(token);
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
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/invites/${code}${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return await res.json();
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
    const res = await fetch(`https://discord.com/api/v9/invites/${code}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
        'X-Audit-Log-Reason': reason ?? ''
      }
    });
    return await res.json();
  }
}

export { InviteManager };
