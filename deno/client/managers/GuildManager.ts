import { axiod, option } from '../../dep.ts';

import { APIVersions } from '../Client.ts';
import {
  Ban,
  Channel,
  ChannelType,
  DefaultMessageNotificationsLevel,
  ExplicitContentFilterLevel,
  GetGuildWidget,
  Guild,
  GuildFeature,
  GuildMember,
  GuildPreview,
  GuildWidgetSettings,
  Integration,
  Invite,
  Overwrite,
  Role,
  SystemChannelFlags,
  ThreadMember,
  VerificationLevel,
  VoiceRegion,
  WelcomeScreen,
  WelcomeScreenChannel
} from '../../structures/index.ts';

interface CreateGuildOptions {
  name: string;
  region?: string;
  icon?: any;
  verificationLevel?: VerificationLevel;
  defaultMessageNotifications?: DefaultMessageNotificationsLevel;
  explicitContentFilter?: ExplicitContentFilterLevel;
  roles: Role[];
  channels: Channel[];
  afk_channel_id?: string;
  afk_timeout?: number;
  system_channel_id?: string;
  system_channel_flags?: SystemChannelFlags;
}

interface ModifyGuildOptions {
  name?: string;
  region?: string;
  verification_level?: VerificationLevel;
  default_message_notifications?: DefaultMessageNotificationsLevel;
  explicit_content_filter?: ExplicitContentFilterLevel;
  afk_channel_id?: string;
  afk_timeout?: number;
  icon?: any;
  owner_id?: string;
  splash?: any;
  discovery_splash?: any;
  banner?: any;
  system_channel_id?: string;
  system_channel_flags?: SystemChannelFlags;
  public_updates_channel_id?: string;
  preferred_locale?: string;
  features?: GuildFeature[];
  description?: string;
  premium_progress_bar_enabled?: boolean;
}

interface CreateGuildChannelOptions {
  name: string;
  type: ChannelType;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  position?: number;
  permission_overwrites?: Overwrite[];
  parent_id?: string;
  nsfw?: boolean;
  default_auto_archive_duration?: number;
}

interface ModifyGuildChannelPositionOptions {
  id: string;
  position?: number;
  lock_permissions?: boolean;
  parent_id?: string;
}

interface ListActiveThreadsResponse {
  threads: Channel[];
  members: ThreadMember[];
}

interface ListGuildMembersOptions {
  limit: number;
  after?: string;
}

interface SearchGuildMembersOptions {
  query?: string;
  limit?: number;
}

interface AddGuildMemberOptions {
  access_token: string;
  nick?: string;
  roles?: string[];
  mute?: boolean;
  deaf?: boolean;
}

interface ModifyGuildMemberOptions {
  nick?: string;
  roles?: string[];
  mute?: boolean;
  deaf?: boolean;
  channel_id?: string;
  communication_disabled_until?: number;
}

interface ModifyCurrentGuildMemberOptions {
  nick?: string;
}

interface GetGuildBansOptions {
  limit?: number;
  before?: string;
  after?: string;
}

interface CreateGuildBanOptions {
  delete_message_days?: number;
  reason?: string;
}

interface GuildRoleOptions {
  name?: string;
  permissions?: number;
  color?: number;
  hoist?: boolean;
  icon?: any;
  unicode_emoji?: boolean;
  mentionable?: boolean;
}

interface ModifyGuildRolePositionOptions {
  id: string;
  position?: number;
}

interface GetGuildPruneCountOptions {
  days?: number;
  include_roles?: string;
}

interface GuildPruneCountResponse {
  pruned: number;
}

interface BeginGuildPruneOptions extends GetGuildPruneCountOptions {
  compute_prune_count?: boolean;
}

interface ModifyWelcomeScreenOption {
  enabled?: boolean;
  welcom_channels?: WelcomeScreenChannel[];
  description?: string;
}

interface ModifyCurentUserVoiceStateOption {
  channel_id: string;
  suppress?: boolean;
  request_to_speak_timestamp?: number;
}

interface ModifyUserVoiceStateOption {
  channel_id: string;
  suppress?: boolean;
}

class GuildManager {
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
   * Creates a guild
   * @param {CreateGuildOptions} options - CreateGuildOptions
   * @returns Guild object
   */
  public async createGuild(options: CreateGuildOptions): Promise<Guild> {
    const res = await axiod.post<Guild>(
      `https://discord.com/api/v${this.version}/guilds`,
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
   * Gets a guild by its ID
   * @param {string} guildId - The ID of the guild you want to get.
   * @returns Guild object
   */
  public async getGuild(guildId: string): Promise<Guild> {
    const res = await axiod.get<Guild>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}`,
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
   * Gets the guild preview.
   * @param {string} guildId - The ID of the guild you want to get the preview of.
   * @returns GuildPreview object
   */
  public async getGuildPreview(guildId: string): Promise<GuildPreview> {
    const res = await axiod.get<GuildPreview>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/preview`,
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
   * Modify a guild
   * @param {string} guildId - The ID of the guild you want to modify.
   * @param {ModifyGuildOptions} option - ModifyGuildOptions
   * @returns Guild object
   */
  public async modifyGuild(
    guildId: string,
    option: ModifyGuildOptions
  ): Promise<Guild> {
    const res = await axiod.patch<Guild>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}`,
      JSON.stringify(option),
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
   * Delete a guild
   * @param {string} guildId - The ID of the guild you want to delete.
   */
  public async deleteGuild(guildId: string): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}`,
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
   * Gets all the channels in a guild.
   * @param {string} guildId - The ID of the guild you want to get the channels from.
   * @returns Array of channels
   */
  public async getGuildChannels(guildId: string): Promise<Channel[]> {
    const res = await axiod.get<Channel[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Higa (https://gitub.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Creates a guild channel.
   * @param {string} guildId - The ID of the guild you want to create a channel in.
   * @param {CreateGuildChannelOptions} option - CreateGuildChannelOptions
   * @returns Channel object
   */
  public async createGuildChannel(
    guildId: string,
    option: CreateGuildChannelOptions
  ): Promise<Channel> {
    const res = await axiod.post<Channel>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/channels`,
      JSON.stringify(option),
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
   * Modify the position of a guild channel
   * @param {string} guildId - The ID of the guild you want to modify the channel position of.
   * @param {ModifyGuildChannelPositionOptions} option - ModifyGuildChannelPositionOptions
   */
  public async modifyGuildChannelPosition(
    guildId: string,
    option: ModifyGuildChannelPositionOptions
  ): Promise<void> {
    await axiod.patch(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/channels`,
      JSON.stringify(option),
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
   * List active threads in a guild
   * @param {string} guildId - The ID of the guild you want to get the active threads from.
   * @returns Array of threads and members
   */
  public async listActiveThreads(
    guildId: string
  ): Promise<ListActiveThreadsResponse> {
    const res = await axiod.get<ListActiveThreadsResponse>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/threads/active`,
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
   * Get a guild member.
   * @param {string} guildId - The ID of the guild you want to get the member from.
   * @param {string} userId - The user's ID.
   * @returns A GuildMember object
   */
  public async getGuildMember(
    guildId: string,
    userId: string
  ): Promise<GuildMember> {
    const res = await axiod.get<GuildMember>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}`,
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
   * Lists all the members in a guild.
   * @param {string} guildId - The ID of the guild you want to get the members of.
   * @param {ListGuildMembersOptions} option - ListGuildMembersOptions @default {limit:1000}
   * @returns Array of GuildMember objects.
   */
  public async listGuildMembers(
    guildId: string,
    option: ListGuildMembersOptions = { limit: 1000 }
  ): Promise<GuildMember[]> {
    const res = await axiod.get<GuildMember[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>(<unknown>option)
      }
    );
    return res.data;
  }

  /**
   * Searches for members in a guild.
   * @param {string} guildId - The ID of the guild to search in.
   * @param {SearchGuildMembersOptions} option - SearchGuildMembersOptions = {}
   * @returns Array of GuildMember objects.
   */
  public async searchGuildMembers(
    guildId: string,
    option: SearchGuildMembersOptions = {}
  ): Promise<GuildMember[]> {
    const res = await axiod.get<GuildMember[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/search`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>option
      }
    );
    return res.data;
  }

  /**
   * Add a user to a guild
   * @param {string} guildId - The ID of the guild you want to add a member to.
   * @param {string} userId - The user's ID.
   * @param {AddGuildMemberOptions} options - {
   * @returns GuildMember object.
   */
  public async addGuildMember(
    guildId: string,
    userId: string,
    options: AddGuildMemberOptions
  ): Promise<GuildMember> {
    const res = await axiod.put<GuildMember>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}`,
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
   * Modify a guild member
   * @param {string} guildId - The ID of the guild you want to modify the member of.
   * @param {string} userId - The user's id
   * @param {ModifyGuildMemberOptions} options - ModifyGuildMemberOptions
   * @param {string} [reason] - The reason for the audit log.
   * @returns GuildMember object.
   */
  public async modifyGuildMember(
    guildId: string,
    userId: string,
    options: ModifyGuildMemberOptions,
    reason?: string
  ): Promise<GuildMember> {
    const res = await axiod.patch<GuildMember>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}`,
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
   * Modify the current user's guild member
   * @param {string} guildId - The ID of the guild you want to modify the current member of.
   * @param {ModifyCurrentGuildMemberOptions} options - ModifyCurrentGuildMemberOptions
   * @param {string} [reason] - The reason for the audit log.
   * @returns GuildMember object.
   */
  public async modifyCurrentMember(
    guildId: string,
    options: ModifyCurrentGuildMemberOptions,
    reason?: string
  ): Promise<GuildMember> {
    const res = await axiod.patch<GuildMember>(
      `https://discord.com/api/v${this.version}/users/@me/guilds/${guildId}`,
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
   * Adds a role to a guild member
   * @param {string} guildId - The ID of the guild you want to add the role to.
   * @param {string} userId - The user's ID
   * @param {string} roleId - The ID of the role you want to add to the user.
   * @param {string} [reason] - The reason for the audit log.
   * @returns A GuildMember object.
   */
  public async addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<GuildMember> {
    const res = await axiod.put<GuildMember>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      '',
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
   * Removes a role to a guild member
   * @param {string} guildId - The ID of the guild you want to remove the role to.
   * @param {string} userId - The user's ID
   * @param {string} roleId - The ID of the role you want to remove to the user.
   * @param {string} [reason] - The reason for the audit log.
   * @returns A GuildMember object.
   */
  public async removeGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<GuildMember> {
    const res = await axiod.delete<GuildMember>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
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
   * Removes a guild member
   * @param {string} guildId - The ID of the guild you want to remove.
   * @param {string} userId - The user's ID
   * @param {string} [reason] - The reason for the audit log.
   */
  public async removeGuildMember(
    guildId: string,
    userId: string,
    reason?: string
  ): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/members/${userId}`,
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

  /**
   * Gets the bans of a guild
   * @param {string} guildId - The ID of the guild to get the bans from.
   * @param {GetGuildBansOptions} options - GetGuildBansOptions = {}
   * @returns Array of bans.
   */
  public async getGuildBans(
    guildId: string,
    options: GetGuildBansOptions = {}
  ): Promise<Ban[]> {
    const res = await axiod.get<Ban[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/bans`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>options
      }
    );
    return res.data;
  }

  /**
   * Gets the ban of a user in a guild.
   * @param {string} guildId - The ID of the guild you want to get the ban from.
   * @param {string} userId - The user's ID.
   * @returns Ban object
   */
  public async getGuildBan(guildId: string, userId: string): Promise<Ban> {
    const res = await axiod.get<Ban>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/bans/${userId}`,
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
   * Creates the ban of a user in a guild.
   * @param {string} guildId - The ID of the guild you want to create the ban from.
   * @param {string} userId - The user's ID.
   * @returns Ban object
   */
  public async createGuildBan(
    guildId: string,
    userId: string,
    options: CreateGuildBanOptions = {}
  ): Promise<Ban> {
    const res = await axiod.put<Ban>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/bans/${userId}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': options.reason ?? ''
        }
      }
    );
    return res.data;
  }

  /**
   * Removes the ban of a user in a guild.
   * @param {string} guildId - The ID of the guild you want to Remove the ban from.
   * @param {string} userId - The user's ID.
   * @returns Ban object
   */
  public async RemoveGuildBan(
    guildId: string,
    userId: string,
    reason?: string
  ): Promise<Ban> {
    const res = await axiod.delete<Ban>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/bans/${userId}`,
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
   * Gets the roles of a guild.
   * @param {string} guildId - The ID of the guild you want to get the roles from.
   * @returns Array of Role objects.
   */
  public async getGuildRoles(guildId: string): Promise<Role[]> {
    const res = await axiod.get<Role[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/roles`,
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
   * Creates a role in a guild
   * @param {string} guildId - The ID of the guild you want to create a role in.
   * @param {GuildRoleOptions} options - GuildRoleOptions = {}
   * @param {string} [reason] - The reason for the audit log.
   * @returns Role object
   */
  public async createGuildRole(
    guildId: string,
    options: GuildRoleOptions = {},
    reason?: string
  ): Promise<Role> {
    const res = await axiod.post<Role>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/roles`,
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
   * Modify the positions of a set of role objects for the guild
   * @param {string} guildId - The ID of the guild you want to modify the role position of.
   * @param {ModifyGuildRolePositionOptions} options - ModifyGuildRolePositionOptions
   * @param {string} [reason] - The reason for the audit log.
   * @returns Array of roles.
   */
  public async modifyGuildRolePosition(
    guildId: string,
    options: ModifyGuildRolePositionOptions,
    reason?: string
  ): Promise<Role[]> {
    const res = await axiod.patch<Role[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/roles`,
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
   * Modifys a role in a guild
   * @param {string} guildId - The ID of the guild you want to Modify a role in.
   * @param {GuildRoleOptions} options - GuildRoleOptions
   * @param {string} [reason] - The reason for the audit log.
   * @returns Role object
   */
  public async ModifyGuildRole(
    guildId: string,
    options: GuildRoleOptions,
    reason?: string
  ): Promise<Role> {
    const res = await axiod.patch<Role>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/roles`,
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
   * Deletes a role from a guild
   * @param {string} guildId - The ID of the guild you want to delete the role from.
   * @param {string} roleId - The ID of the role you want to delete.
   * @param {string} [reason] - The reason for the audit log.
   */
  public async deleteGuildRole(
    guildId: string,
    roleId: string,
    reason?: string
  ): Promise<void> {
    await axiod.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/roles/${roleId}`,
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

  /**
   * Gets the number of members that would be removed in a prune operation
   * @param {string} guildId - The ID of the guild you want to get the prune count of.
   * @param {GetGuildPruneCountOptions} options - GetGuildPruneCountOptions
   * @returns Number of members that would be removed in a prune operation.
   */
  public async GetGuildPruneCount(
    guildId: string,
    options: GetGuildPruneCountOptions
  ): Promise<GuildPruneCountResponse> {
    const res = await axiod.get<GuildPruneCountResponse>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/prune`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: <option>options
      }
    );
    return res.data;
  }

  /**
   * Begins a prune of members in a guild
   * @param {string} guildId - The ID of the guild you want to prune.
   * @param {BeginGuildPruneOptions} options - BeginGuildPruneOptions
   * @param {string} [reason] - The reason for the prune.
   * @returns GuildPruneCountResponse object.
   */
  public async BeginGuildPrune(
    guildId: string,
    options: BeginGuildPruneOptions,
    reason?: string
  ): Promise<GuildPruneCountResponse> {
    const res = await axiod.post<GuildPruneCountResponse>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/prune`,
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
   * Gets the voice regions of a guild.
   * @param {string} guildId - The ID of the guild you want to get the voice regions of.
   * @returns An array of VoiceRegion objects.
   */
  public async getGuildVoiceRegions(guildId: string): Promise<VoiceRegion[]> {
    const res = await axiod.get<VoiceRegion[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/regions`,
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
   * Gets the invites of a guild.
   * @param {string} guildId - The ID of the guild you want to get the invites from.
   * @returns An array of Invite objects.
   */
  public async getGuildInvites(guildId: string): Promise<Invite[]> {
    const res = await axiod.get<Invite[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/invites`,
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
   * Gets the integrations of a guild.
   * @param {string} guildId - The ID of the guild you want to get the integrations from.
   * @returns An array of Integration objects.
   */
  public async getGuildIntegrations(guildId: string): Promise<Integration[]> {
    const res = await axiod.get<Integration[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/integrations`,
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
   * Deletes a integrations of a guild.
   * @param {string} guildId - The ID of the guild you want to delete a integrations from.
   * @param {string} integrationId - The ID of the integration you want to delete.
   * @param {string} [reason] - The reason for the deletion.
   */
  public async deleteGuildIntegrations(
    guildId: string,
    integrationId: string,
    reason?: string
  ): Promise<void> {
    await axiod.delete<Integration[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/integrations/${integrationId}`,
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

  /**
   * Gets the widget settings of a guild.
   * @param {string} guildId - The ID of the guild you want to get the widget settings from.
   * @returns An array of widget settings objects.
   */
  public async getGuildWidgetSettings(
    guildId: string
  ): Promise<GuildWidgetSettings> {
    const res = await axiod.get<GuildWidgetSettings>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/widget`,
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
   * Gets the guild widget.
   * @param {string} guildId - The ID of the guild you want to get the widget for.
   * @returns GetGuildWidget
   */
  public async getGuildWidget(guildId: string): Promise<GetGuildWidget> {
    const res = await axiod.get<GetGuildWidget>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/widget.json`,
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
   * Gets the guild's vanity URL.
   * @param {string} guildId - The ID of the guild you want to get the vanity URL for.
   * @returns The guild's vanity URL.
   */
  public async getGuildVanityUrl(guildId: string): Promise<Invite> {
    const res = await axiod.get<Invite>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/vanity-url`,
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
   * Gets the welcome screen of a guild.
   * @param {string} guildId - The ID of the guild you want to get the welcome screen of.
   * @returns WelcomeScreen
   */
  public async getGuildWelcomeScreen(guildId: string): Promise<WelcomeScreen> {
    const res = await axiod.get<WelcomeScreen>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/welcome-screen`,
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
   * Modified the welcome screen of a guild.
   * @param {string} guildId - The ID of the guild you want to modify the welcome screen of.
   * @param {ModifyWelcomeScreenOption} options - Options.
   * @returns WelcomeScreen
   */
  public async modifyGuildWelcomeScreen(
    guildId: string,
    options: ModifyWelcomeScreenOption
  ): Promise<WelcomeScreen> {
    const res = await axiod.patch<WelcomeScreen>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/welcome-screen`,
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
   * Modify the current user voice state
   * @param {string} guildId - The ID of the guild
   * @param {ModifyGuildVoiceStateOption} options - Options
   */
  public async modifyCurrentUserVoiceState(
    guildId: string,
    options: ModifyCurentUserVoiceStateOption
  ): Promise<void> {
    await axiod.patch(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/voice-states/@me`,
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
  }

  /**
   * Modify a user voice state
   * @param {string} guildId - The ID of the guild
   * @param {string} userId - The ID of the user
   * @param {ModifyGuildVoiceStateOption} options - Options
   */
  public async modifyUserVoiceState(
    guildId: string,
    userId: string,
    options: ModifyUserVoiceStateOption
  ): Promise<void> {
    await axiod.patch(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/voice-states/${userId}`,
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
  }
}

export { GuildManager };
export type {
  CreateGuildOptions,
  ModifyGuildOptions,
  CreateGuildChannelOptions,
  ModifyGuildChannelPositionOptions,
  ListActiveThreadsResponse,
  ListGuildMembersOptions,
  SearchGuildMembersOptions,
  AddGuildMemberOptions,
  ModifyGuildMemberOptions,
  ModifyCurrentGuildMemberOptions,
  GetGuildBansOptions,
  CreateGuildBanOptions,
  GuildRoleOptions,
  ModifyGuildRolePositionOptions,
  GetGuildPruneCountOptions,
  GuildPruneCountResponse,
  BeginGuildPruneOptions,
  ModifyWelcomeScreenOption,
  ModifyCurentUserVoiceStateOption,
  ModifyUserVoiceStateOption
};
