import {
  RESTGetAPIAuditLogQuery,
  RESTGetAPIAuditLogResult
} from 'discord-api-types/v9';
import axios from 'axios';

class AuditLogManager {
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
    const res = await axios.get<RESTGetAPIAuditLogResult>(
      `https://discord.com/api/v9/guilds/${guildID}/audit-logs`,
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

export { AuditLogManager };
