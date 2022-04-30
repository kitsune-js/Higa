import { axiod } from '../../dep.ts';
import { APIVersions } from '../Client.ts';

import {
  StageInstance,
  StageInstancePrivacyLevel
} from '../../structures/index.ts';

interface CreateStageInstanceOptions {
  channel_id: string;
  topic: string;
  privacy_level: StageInstancePrivacyLevel;
  send_start_notification?: boolean;
}

interface ModifyStageInstanceOptions {
  topic?: string;
  privacy_level?: StageInstancePrivacyLevel;
}

class StageInstanceManager {
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
   * Create a stage instance
   * @param {CreateStageInstanceOptions} options - CreateStageInstanceOptions
   * @returns A StageInstance object.
   */
  public async createStageInstance(
    options: CreateStageInstanceOptions,
    reason?: string
  ): Promise<StageInstance> {
    const res = await axiod.post<StageInstance>(
      `https://discord.com/api/v${this.version}/stage-instances`,
      JSON.stringify(options),
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

  /**
   * Get the stage instance of a channel
   * @param {string} channelId - The ID of the channel you want to get the stage instance of.
   * @returns A Stage Instance
   */
  public async getStageInstance(channelId: string): Promise<StageInstance> {
    const res = await axiod.get<StageInstance>(
      `https://discord.com/api/v${this.version}/stage-instances/${channelId}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Modify a stage instance
   * @param {string} channelId - The ID of the channel you want to modify.
   * @param {ModifyStageInstanceOptions} options - ModifyStageInstanceOptions
   * @param {string} [reason] - The reason for the action.
   * @returns A Stage Instance
   */
  public async modifyStageInstance(
    channelId: string,
    options: ModifyStageInstanceOptions,
    reason?: string
  ): Promise<StageInstance> {
    const res = await axiod.patch<StageInstance>(
      `https://discord.com/api/v${this.version}/stage-instances/${channelId}`,
      JSON.stringify(options),
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

  /**
   * Deletes a stage instance
   * @param {string} channelId - The ID of the channel you want to delete.
   * @param {string} [reason] - The reason for the deletion.
   */
  public async deleteStageInstance(
    channelId: string,
    reason?: string
  ): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/stage-instances/${channelId}`,
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
  }
}

export { StageInstanceManager };
export type { CreateStageInstanceOptions, ModifyStageInstanceOptions };
