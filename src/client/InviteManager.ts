import {
  RESTDeleteAPIInviteResult,
  RESTGetAPIInviteQuery,
  RESTGetAPIInviteResult
} from 'discord-api-types';
import fetch from 'node-fetch';

class AuditLogManager {
  /**
   * Application's token
   */
  private token: string;

  /**
   * @param token - Bot's token
   */
  constructor(token: string) {
    this.token = token;
  }

  /**
   * Translate an object into query string for GET requests
   * @param options - Object of options
   * @returns Query string
   */
  private optionsToQueryStringParams(options: object): string {
    let params = '?';
    const paramsArray = [];
    for (const t of Object.entries(options)) {
      paramsArray.push(`${t[0]}=${t[1]}`);
    }
    params += paramsArray.join('&');
    return params;
  }

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

export { AuditLogManager };
