import {
  RESTGetAPIAuditLogQuery,
  RESTGetAPIAuditLogResult
} from 'discord-api-types';
import fetch from 'node-fetch';
import { Manager } from './DefaultManager';

class AuditLogManager extends Manager {
  /**
   * @param token - Bot's token
   */
  constructor(token: string) {
    super(token);
  }

  /**
   * Get the Audit Logs from a guild
   * @param guildID - Guild Identifiant
   * @param options - Options for the query string
   * @returns - Guild Audit Log Object
   */
  public async getGuildAuditLog(
    guildID: string,
    options: RESTGetAPIAuditLogQuery
  ): Promise<RESTGetAPIAuditLogResult> {
    const params = this.optionsToQueryStringParams(options);
    const res = await fetch(
      `https://discord.com/api/v9/guilds/${guildID}/audit-logs${params}`,
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
}

export { AuditLogManager };
