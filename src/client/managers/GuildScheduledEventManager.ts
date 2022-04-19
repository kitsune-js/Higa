import axios from 'axios';

import { APIVersions } from '../..';
import {
  GuildScheduledEvent,
  GuildScheduledEventEntityMetadata,
  GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventUser
} from '../../structures';

interface GetScheduleEventsOptions {
  with_user_count?: boolean;
}

interface CreateScheduleEventOptions {
  channel_id?: string;
  entity_metadata?: GuildScheduledEventEntityMetadata;
  name: string;
  privacy_level: GuildScheduledEventPrivacyLevel;
  scheduled_start_time: number;
  scheduled_end_time?: number;
  description?: string;
  entity_type: GuildScheduledEventEntityType;
  image: any;
}

interface GetScheduledEventUsersOptions {
  limit?: number;
  after?: string;
  before?: string;
  with_members?: boolean;
}

class GuildScheduledEventManager {
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
   * List sheduled events for a guild
   * @param guildId - Guild ID
   * @param query - Query
   * @returns List of scheduled events
   */
  public async listScheduledEvents(
    guildId: string,
    query: GetScheduleEventsOptions = {}
  ): Promise<GuildScheduledEvent[]> {
    const res = await axios.get<GuildScheduledEvent[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: query
      }
    );
    return res.data;
  }

  /**
   * Create a scheduled event
   * @param guildId - Guild ID
   * @param options - Scheduled event option
   * @returns Scheduled event
   */
  public async createScheduledEvent(
    guildId: string,
    options: CreateScheduleEventOptions,
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const res = await axios.post<GuildScheduledEvent>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events`,
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
   * Get a scheduled event
   * @param guildId - Guild ID
   * @param eventId - Scheduled event ID
   * @returns Scheduled event
   */
  public async getScheduledEvent(
    guildId: string,
    eventId: string,
    options: GetScheduleEventsOptions = {}
  ): Promise<GuildScheduledEvent> {
    const res = await axios.get<GuildScheduledEvent>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events/${eventId}`,
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
   * Modify a scheduled event
   * @param guildId - Guild ID
   * @param eventId - Scheduled event ID
   * @param options - Scheduled event options
   * @param reason - Modification reason
   * @returns Scheduled event
   */
  public async modifyScheduledEvent(
    guildId: string,
    eventId: string,
    options: CreateScheduleEventOptions,
    reason?: string
  ): Promise<GuildScheduledEvent> {
    const res = await axios.patch<GuildScheduledEvent>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events/${eventId}`,
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
   * Delete a scheduled event
   * @param guildId - Guild ID
   * @param eventId - Scheduled event ID
   */
  public async deleteScheduledEvent(
    guildId: string,
    eventId: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events/${eventId}`,
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
   * Get guild scheduled event users
   * @param guildId - Guild ID
   * @param eventId - Scheduled event ID
   * @param options - Query
   * @returns List of users
   */
  public async getScheduledEventUsers(
    guildId: string,
    eventId: string,
    options: GetScheduledEventUsersOptions = {}
  ): Promise<GuildScheduledEventUser[]> {
    const res = await axios.get<GuildScheduledEventUser[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/scheduled-events/${eventId}/users`,
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
}

export {
  GuildScheduledEventManager,
  GetScheduleEventsOptions,
  GetScheduledEventUsersOptions,
  CreateScheduleEventOptions
};
