import { axiod, option } from '../../dep.ts';
import { APIVersions } from '../Client.ts';
import { AuditLog, AuditLogEvent } from '../../structures/index.ts';

interface GetAuditLogOptions {
  user_id: string;
  action_type: AuditLogEvent;
  before: string;
  limit: number;
}

class AuditLogManager {
  /**
   * Bot's token
   */
  readonly #token: string;

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
   * Get the Audit Logs from a guild
   * @param guildID - Guild Identifiant
   * @param options - Options for the query string
   * @returns - Guild Audit Log Object
   */
  public async getGuildAuditLog(
    guildID: string,
    options: GetAuditLogOptions
  ): Promise<AuditLog> {
    const res = await axiod.get<AuditLog>(
      `https://discord.com/api/v${this.version}/guilds/${guildID}/audit-logs`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>(<unknown>options)
      }
    );
    return res.data;
  }
}

export { AuditLogManager };
