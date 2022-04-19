import axios from 'axios';

import { APIVersions } from '../..';
import { Emoji } from '../../structures';

interface CreateGuildEmojiOptions {
  name: string;
  image: any;
  roles: string[];
}

interface ModifyGuildEmojiOptions {
  name: string;
  roles: string[];
}

class EmojiManager {
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
   * List guild emojis
   * @param guildId - Guild ID
   * @returns - Emoji Array
   */
  public async listEmojis(guildId: string): Promise<Emoji[]> {
    const res = await axios.get<Emoji[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/emojis`,
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

  /**
   * Get an emoji
   * @param guildId - Guild ID
   * @param emojiId - Emoji ID
   * @returns - Emoji Object
   */
  public async getEmoji(guildId: string, emojiId: string): Promise<Emoji> {
    const res = await axios.get<Emoji>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/emojis/${emojiId}`,
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

  /**
   * Create an emoji
   * @param guildId - Guild ID
   * @param options - Options for the creation of the emoji
   * @returns - Emoji Object
   */
  public async createEmoji(
    guildId: string,
    options: CreateGuildEmojiOptions
  ): Promise<Emoji> {
    const res = await axios.post<Emoji>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/emojis`,
      JSON.stringify(options),
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

  /**
   * Modify an emoji
   * @param guildId - Guild ID
   * @param emojiId - Emoji ID
   * @param options - Options for the modification of the emoji
   * @returns - Emoji Object
   */
  public async modifyEmoji(
    guildId: string,
    emojiId: string,
    options: ModifyGuildEmojiOptions
  ): Promise<Emoji> {
    const res = await axios.patch<Emoji>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/emojis/${emojiId}`,
      JSON.stringify(options),
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

  /**
   * Delete an emoji
   * @param guildId - Guild ID
   * @param emojiId - Emoji ID
   * @param reason - Reason for deletion
   * @returns - Emoji Object
   */
  public async deleteEmoji(
    guildId: string,
    emojiId: string,
    reason?: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/emojis/${emojiId}`,
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

export { EmojiManager, CreateGuildEmojiOptions, ModifyGuildEmojiOptions };
