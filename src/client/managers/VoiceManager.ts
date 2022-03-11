import { RESTGetAPIGuildVoiceRegionsResult } from 'discord-api-types/v9';
import axios from 'axios';
import { APIVersion } from '../..';

class VoiceManager {
  /**
   * Bot's token
   */
  private token: string;

  /**
   * API Version
   */
  public readonly version: APIVersion;

  /**
   * @param token - Bot's token
   */
  constructor(token: string, version: APIVersion) {
    this.token = token;
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

export { VoiceManager };
