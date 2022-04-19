import { Guild, User } from '../../structures';
import { Role } from '../../structures/Role';
import { APIChannel } from 'discord-api-types/v9';

class CacheManager {
  public channels = new Map<string, APIChannel>();
  public roles = new Map<string, Role>();
  public guilds = new Map<string, Guild>();
  public users = new Map<string, User>();
}

export { CacheManager };
