import { APIVersions } from '../Client.ts';
import { Sticker, StickerPack } from '../../structures/index.ts';
import { axiod } from '../../dep.ts';

interface StickerPacksResponse {
  sticker_packs: StickerPack[];
}

interface CreateStickerOptions {
  name: string;
  description: string;
  tags: string;
  file: any;
}

interface ModifyStickerOptions {
  name?: string;
  description?: string;
  tags?: string;
}

class StickerManager {
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
   * Get a sticker
   * @param {string} stickerId - The ID of the sticker you want to get.
   * @returns A Sticker object.
   */
  public async getSticker(stickerId: string): Promise<Sticker> {
    const res = await axiod.get<Sticker>(
      `https://discord.com/api/v${this.version}/stickers/${stickerId}`,
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
   * Lists all the Nitro Sticker Packs.
   * @returns A list of sticker packs
   */
  public async listNitroStickersPacks(): Promise<StickerPacksResponse> {
    const res = await axiod.get<StickerPacksResponse>(
      `https://discord.com/api/v${this.version}/sticker-packs`,
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
   * List all stickers in a guild
   * @param {string} guildId - The ID of the guild you want to get the stickers from.
   * @returns An array of stickers
   */
  public async listGuildStickers(guildId: string): Promise<Sticker[]> {
    const res = await axiod.get<Sticker[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/stickers`,
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
   * Get a guild sticker
   * @param {string} guildId - The ID of the guild you want to get the sticker from.
   * @param {string} stickerId - The ID of the sticker you want to get.
   * @returns A Sticker object.
   */
  public async getGuildSticker(
    guildId: string,
    stickerId: string
  ): Promise<Sticker> {
    const res = await axiod.get<Sticker>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/stickers/${stickerId}`,
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
   * Create a guild sticker.
   * @param {string} guildId - The ID of the guild you want to create a sticker in.
   * @param {CreateStickerOptions} options - CreateStickerOptions
   * @param {string} [reason] - The reason for the action.
   * @returns A Sticker object
   */
  public async createGuildSticker(
    guildId: string,
    options: CreateStickerOptions,
    reason?: string
  ): Promise<Sticker> {
    const res = await axiod.post<Sticker>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/stickers`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'multipart/form-data',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
    return res.data;
  }

  /**
   * Modify a guild sticker
   * @param {string} guildId - The ID of the guild you want to modify the sticker in.
   * @param {string} stickerId - The ID of the sticker you want to modify.
   * @param {ModifyStickerOptions} options - ModifyStickerOptions
   * @param {string} [reason] - The reason for the action.
   * @returns A Sticker object
   */
  public async modifyGuildSticker(
    guildId: string,
    stickerId: string,
    options: ModifyStickerOptions,
    reason?: string
  ): Promise<Sticker> {
    const res = await axiod.patch<Sticker>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/stickers/${stickerId}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'multipart/form-data',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
    return res.data;
  }

  /**
   * Deletes a guild sticker.
   * @param {string} guildId - The ID of the guild you want to delete the sticker from.
   * @param {string} stickerId - The ID of the sticker to delete.
   * @param {string} [reason] - The reason for the action.
   */
  public async deleteGuilSticker(
    guildId: string,
    stickerId: string,
    reason?: string
  ): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/stickers/${stickerId}`,
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

export { StickerManager };
