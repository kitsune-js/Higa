import { axiod } from '../../dep.ts';

import { APIVersions } from '../Client.ts';
import { VoiceRegion } from '../../structures/index.ts';

class VoiceManager {
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
   * It returns a list of voice regions
   * @returns Voice Regions' Array
   */
  public async listVoiceRegions(): Promise<VoiceRegion[]> {
    const res = await axiod.get<VoiceRegion[]>(
      `https://discord.com/api/v9/voice/regions`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
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
