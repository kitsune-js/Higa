import axios from 'axios';

import { APIVersions } from '../..';
import {
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandType,
  ApplicationCommandPermissions,
  GuildApplicationCommandPermissions,
  LocalizedString
} from '../../structures';

interface GetApplicationCommandsOptions {
  with_localizations?: boolean;
}

interface ApplicationCommandOptions {
  id?: string;
  name?: string;
  name_localizations?: LocalizedString;
  description?: string;
  description_localizations?: LocalizedString;
  options?: ApplicationCommandOption[];
  default_permission?: boolean;
  type?: ApplicationCommandType;
}

interface EditPermissionsOptions {
  permissions: ApplicationCommandPermissions[];
}

class ApplicationCommandManager {
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
   * Get a list of global application commands
   * @param {string} applicationId - The ID of the application you want to get the commands of.
   * @param {GetGlobalApplicationCommandsOptions} options - GetGlobalApplicationCommandsOptions = {}
   * @returns Array of ApplicationCommand objects.
   */
  public async getGlobalApplicationCommands(
    applicationId: string,
    options: GetApplicationCommandsOptions = {}
  ): Promise<ApplicationCommand[]> {
    const res = await axios.get<ApplicationCommand[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }

  /**
   * Create a global application command
   * @param {string} applicationId - The ID of the application you want to create a command for.
   * @param {CreateApplicationCommandOptions} options - CreateApplicationCommandOptions
   * @returns ApplicationCommand object.
   */
  public async createGlobalApplicationCommand(
    applicationId: string,
    options: ApplicationCommandOptions
  ): Promise<ApplicationCommand> {
    const res = await axios.post<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands`,
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
   * Get a global application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} commandId - The ID of the command you want to get.
   * @returns ApplicationCommand object.
   */
  public async getGlobalApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    const res = await axios.get<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands/${commandId}`,
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
   * Edit a global application command
   * @param {string} applicationId - The ID of the application you want to edit the command of.
   * @param {string} commandId - The ID of the command you want to edit.
   * @param {GetGlobalApplicationCommandsOptions} options - GetGlobalApplicationCommandsOptions
   * @returns ApplicationCommand object.
   */
  public async editGlobalApplicationCommand(
    applicationId: string,
    commandId: string,
    options: ApplicationCommandOptions
  ): Promise<ApplicationCommand> {
    const res = await axios.patch<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands/${commandId}`,
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
   * Delete a global application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} commandId - The ID of the command you want to delete.
   */
  public async deleteGlobalApplicationCommand(
    applicationId: string,
    commandId: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands/${commandId}`,
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

  /**
   * Overwrites the global application commands
   * @param {string} applicationId - The ID of the application you want to modify.
   * @param {ApplicationCommandOptions[]} options - ApplicationCommandOptions[]
   * @returns Array of ApplicationCommand objects.
   */
  public async bulkOverwriteGlobalApplicationCommands(
    applicationId: string,
    options: ApplicationCommandOptions[]
  ): Promise<ApplicationCommand[]> {
    const res = await axios.patch<ApplicationCommand[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/commands/bulk`,
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
   * Get a list of commands for a guild application
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to get the commands from.
   * @returns Array of ApplicationCommand objects.
   */
  public async getGuildApplicationCommands(
    applicationId: string,
    guildId: string,
    options: GetApplicationCommandsOptions
  ): Promise<ApplicationCommand[]> {
    const res = await axios.get<ApplicationCommand[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }

  /**
   * Create a new application command for a guild
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to create the command in.
   * @param {ApplicationCommandOptions} options - ApplicationCommandOptions
   * @returns ApplicationCommand
   */
  public async createGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    options: ApplicationCommandOptions
  ): Promise<ApplicationCommand> {
    const res = await axios.post<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands`,
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
   * Get a guild application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to get the application command from.
   * @param {string} commandId - The ID of the command you want to get.
   * @returns ApplicationCommand
   */
  public async getGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<ApplicationCommand> {
    const res = await axios.get<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
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
   * Update a guild application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to update the application command in.
   * @param {string} commandId - The ID of the command you want to update.
   * @param {ApplicationCommandOptions} options - ApplicationCommandOptions
   * @returns ApplicationCommand
   */
  public async editGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string,
    options: ApplicationCommandOptions
  ): Promise<ApplicationCommand> {
    const res = await axios.patch<ApplicationCommand>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
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
   * Delete a guild application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to delete the application command from.
   * @param {string} commandId - The ID of the command you want to delete.
   */
  public async deleteGuildApplicationCommand(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
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

  /**
   * Overwrite guild application commands
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to overwrite the application commands in.
   * @param {ApplicationCommandOptions[]} options - ApplicationCommandOptions[]
   * @returns ApplicationCommand[]
   */
  public async bulkOverwriteGuildApplicationCommands(
    applicationId: string,
    guildId: string,
    options: ApplicationCommandOptions[]
  ): Promise<ApplicationCommand[]> {
    const res = await axios.patch<ApplicationCommand[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands`,
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
   * Get permissions for a guild application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to get the permissions for.
   * @param {string} commandId - The ID of the command you want to get the permissions for.
   * @returns GuildApplicationCommandPermissions[]
   */
  public async getGuildApplicationCommandPermissions(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<GuildApplicationCommandPermissions[]> {
    const res = await axios.get<GuildApplicationCommandPermissions[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
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
   * Get permissions for an application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to get the permissions for.
   * @param {string} commandId - The ID of the command you want to get the permissions for.
   * @returns GuildApplicationCommandPermissions[]
   */
  public async getApplicationCommandPermissions(
    applicationId: string,
    guildId: string,
    commandId: string
  ): Promise<GuildApplicationCommandPermissions[]> {
    const res = await axios.get<GuildApplicationCommandPermissions[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
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
   * Edit permissions for an application command
   * @param {string} applicationId - The ID of the application.
   * @param {string} guildId - The ID of the guild you want to edit the permissions for.
   * @param {string} commandId - The ID of the command you want to edit the permissions for.
   * @param {EditPermissionsOptions} options - EditPermissionsOptions
   * @returns GuildApplicationCommandPermissions[]
   */
  public async editApplicationCommandPermissions(
    applicationId: string,
    guildId: string,
    commandId: string,
    bearerToken: string,
    options: EditPermissionsOptions
  ): Promise<GuildApplicationCommandPermissions[]> {
    const res = await axios.patch<GuildApplicationCommandPermissions[]>(
      `https://discord.com/api/v${this.version}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }
}

export {
  ApplicationCommandManager,
  EditPermissionsOptions,
  ApplicationCommandOptions,
  GetApplicationCommandsOptions
};
