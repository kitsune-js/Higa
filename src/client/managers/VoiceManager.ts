import { RESTGetAPIGuildVoiceRegionsResult } from 'discord-api-types/v9';
import axios from 'axios';
import { APIVersions } from '../..';

class VoiceManager {
  /**
   * Bot's token
   */
  private token: string;

  /**
   * Token type
   */
  private readonly tokenType: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param version - API Version
   */
  constructor(token: string, tokenType: string, version: APIVersions) {
    this.token = token;
    this.tokenType = tokenType;
    this.version = version;
  }

  /**
   * List all the Voice Regions
   * @returns - Array of voice regions
   */
  public async listVoiceRegions(): Promise<RESTGetAPIGuildVoiceRegionsResult> {
    const res = await axios.get<RESTGetAPIGuildVoiceRegionsResult>(
      `https://discord.com/api/v9/voice/regions`,
      {
        headers: {
          Authorization: `${this.tokenType} ${this.token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }
}

export { VoiceManager };
