import axios from 'axios';
import { APIVersions } from '../..';
import { Guild, GuildTemplate } from '../../structures';

interface CreateGuildFromTemplateOptions {
  name: string;
  icon?: string;
}

interface GuildTemplateOptions {
  name?: string;
  description?: string;
}

class GuildTemplateManager {
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
   * Get the guild template.
   * @param {string} templateCode - The template code of the guild template you want to get.
   * @returns A GuildTemplate object.
   */
  public async getGuildTemplate(templateCode: string): Promise<GuildTemplate> {
    const res = await axios.get<GuildTemplate>(
      `https://discord.com/api/v${this.version}/guilds/templates/${templateCode}`,
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
   * Create a new guild from a guild template.
   * @param {string} templateCode - The template code of the guild template you want to create a guild
   * from.
   * @param {CreateGuildFromTemplateOptions} options - {
   * @returns A Guild object.
   */
  public async createGuildFromGuildTemplate(
    templateCode: string,
    options: CreateGuildFromTemplateOptions
  ): Promise<Guild> {
    const res = await axios.post<Guild>(
      `https://discord.com/api/v${this.version}/guilds/templates/${templateCode}`,
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
   * Get the templates for a guild
   * @param {string} guildId - The ID of the guild you want to get the templates of.
   * @returns An array of GuildTemplate objects.
   */
  public async getGuildTemplates(guildId: string): Promise<GuildTemplate[]> {
    const res = await axios.get<GuildTemplate[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/templates`,
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
   * Creates a guild template
   * @param {string} guildId - The ID of the guild you want to create a template for.
   * @param {GuildTemplateOptions} options - GuildTemplateOptions
   * @returns A GuildTemplate object.
   */
  public async createGuildTemplate(
    guildId: string,
    options: GuildTemplateOptions
  ): Promise<GuildTemplate> {
    const res = await axios.post<GuildTemplate>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/templates`,
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
   * Syncs a guild template
   * @param {string} guildId - The ID of the guild you want to sync the template to.
   * @param {string} templateCode - The template code to sync to the guild.
   * @returns A GuildTemplate object.
   */
  public async syncGuildTemplate(
    guildId: string,
    templateCode: string
  ): Promise<GuildTemplate> {
    const res = await axios.put<GuildTemplate>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/templates/${templateCode}/sync`,
      '',
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
   * Modify a guild template
   * @param {string} guildId - The ID of the guild you want to modify the template for.
   * @param {string} templateCode - The template code of the template you want to modify.
   * @param {GuildTemplateOptions} options - GuildTemplateOptions
   * @returns A GuildTemplate object.
   */
  public async modifyGuildTemplate(
    guildId: string,
    templateCode: string,
    options: GuildTemplateOptions
  ): Promise<GuildTemplate> {
    const res = await axios.put<GuildTemplate>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/templates/${templateCode}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https:///github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Deletes a guild template
   * @param {string} guildId - The ID of the guild you want to delete the template from.
   * @param {string} templateCode - The template code of the template you want to delete.
   */
  public async deleteGuildTemplate(
    guildId: string,
    templateCode: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/templates/${templateCode}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }
}

export {
  GuildTemplateManager,
  CreateGuildFromTemplateOptions,
  GuildTemplateOptions
};
