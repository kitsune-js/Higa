import { Guild } from './Guild';
import { User } from './User';

interface GuildTemplate {
  code: string;
  name: string;
  description: string;
  usage_count: number;
  creator_id: string;
  creator: User;
  created_at: number;
  updated_at: number;
  source_guild_id: string;
  serialized_source_guild: Guild;
  is_dirty: boolean;
}

export { GuildTemplate };
