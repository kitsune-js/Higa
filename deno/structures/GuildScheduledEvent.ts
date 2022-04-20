import { GuildMember } from './Guild.ts';
import { User } from './User.ts';

interface GuildScheduledEvent {
  id: string;
  guild_id: string;
  channel_id?: string;
  creator_id?: string;
  name: string;
  description?: string;
  scheduled_start_time: number;
  scheduled_end_time?: number;
  privacy_level: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entity_type: GuildScheduledEventEntityType;
  entity_id?: string;
  entity_metadata?: GuildScheduledEventEntityMetadata;
  creator?: User;
  user_count?: number;
  image?: string;
}

enum GuildScheduledEventPrivacyLevel {
  GUILD_ONLY = 2
}

enum GuildScheduledEventEntityType {
  STAGE_INSTANCE = 1,
  VOICE = 2,
  EXTERNAL = 3
}

enum GuildScheduledEventStatus {
  SCHEDULED = 1,
  STARTED = 2,
  COMPLETED = 3,
  CANCELLED = 4
}

interface GuildScheduledEventEntityMetadata {
  location?: string;
}

interface GuildScheduledEventUser {
  guild_scheduled_event_id: string;
  user: User;
  member?: GuildMember;
}

export {
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
  GuildScheduledEventStatus
};
export type {
  GuildScheduledEvent,
  GuildScheduledEventEntityMetadata,
  GuildScheduledEventUser
};
