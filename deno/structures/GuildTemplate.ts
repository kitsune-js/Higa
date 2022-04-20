import { Guild } from './Guild.ts';
import { User } from './User.ts';

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

export type { GuildTemplate };
