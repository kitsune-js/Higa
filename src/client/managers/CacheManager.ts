import { Channel, Guild, User } from '../../structures';
import { Role } from '../../structures/Role';

class CacheManager {
  public channels = new Map<string, Channel>();
  public roles = new Map<string, Role>();
  public guilds = new Map<string, Guild>();
  public users = new Map<string, User>();
}

export { CacheManager };
