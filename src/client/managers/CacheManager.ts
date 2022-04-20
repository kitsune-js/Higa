import {
  Channel,
  Guild,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Role
} from '../../structures';

class CacheManager {
  public channels = new Map<string, Channel>();
  public roles = new Map<string, Role>();
  public guilds = new Map<string, Guild>();
  /**
   * @warning The Guild Member in that cache doesn't have the permissions property cached
   */
  public guildMembers = new Map<
    [string, string],
    GuildMember & { guild_id: string }
  >();
  public guildScheduledEvents = new Map<string, GuildScheduledEvent>();
  public messages = new Map<string, Message>();
}

export { CacheManager };
