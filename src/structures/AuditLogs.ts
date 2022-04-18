import { Channel, Overwrite } from './Channel';
import { GuildScheduledEvent } from './GuildScheduledEvent';
import { User } from './User';

interface AuditLog {
  audit_log_entries: AuditLogEntry[];
  guild_scheduled_events: GuildScheduledEvent[];
  integrations: any[];
  threads: Channel[];
  users: User[];
  webhooks: any[];
}

enum AuditLogEvent {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82,
  STAGE_INSTANCE_CREATE = 83,
  STAGE_INSTANCE_UPDATE = 84,
  STAGE_INSTANCE_DELETE = 85,
  STICKER_CREATE = 90,
  STICKER_UPDATE = 91,
  STICKER_DELETE = 92,
  GUILD_SCHEDULED_EVENT_CREATE = 100,
  GUILD_SCHEDULED_EVENT_UPDATE = 101,
  GUILD_SCHEDULED_EVENT_DELETE = 102,
  THREAD_CREATE = 110,
  THREAD_UPDATE = 111,
  THREAD_DELETE = 112
}

interface AuditLogEntry {
  target_id: string;
  changes?: AuditLogChange[];
  user_id: string;
  id: string;
  action_type: AuditLogEvent;
  options?: AuditLogEntryInfo;
  reason?: string;
}

// Type of AuditLogKey from Discord API
interface AuditLogKey {
  afk_channel_id: string;
  afk_timeout: number;
  allow: string;
  application_id: string;
  archived: boolean;
  assets: string;
  auto_archive_duration: number;
  available: boolean;
  avatar_hash: string;
  banner_hash: string;
  bitrate: number;
  channel_id: string;
  code: string;
  color: number;
  communication_disabled_until: number;
  deaf: boolean;
  default_auto_archive_duration: number;
  default_message_notifications: number;
  deny: string;
  description: string;
  discovery_splash_hash: string;
  enable_emoticons: boolean;
  entity_type: number;
  expire_behavior: number;
  expire_grace_period: number;
  explicit_content_filter: number;
  format_type: number;
  guild_id: string;
  hoist: boolean;
  icon_hash: string;
  image_hash: string;
  id: string;
  invitable: boolean;
  inviter_id: string;
  location: string;
  locked: boolean;
  max_age: number;
  max_uses: number;
  mentionable: boolean;
  mfa_level: number;
  mute: boolean;
  name: string;
  nick: string;
  nsfw: boolean;
  owner_id: string;
  permission_overwrites: Overwrite[];
  permissions: number;
  position: number;
  preferred_locale: string;
  privacy_level: number;
  prune_delete_days: number;
  public_updates_channel_id: string;
  rate_limit_per_user: number;
  region: string;
  rules_channel_id: string;
  splash_hash: string;
  status: number;
  system_channel_id: string;
  tags: string;
  temporary: boolean;
  topic: string;
  type: number | string;
  unicode_emoji: string;
  user_limit: number;
  uses: number;
  vanity_url_code: string;
  verification_level: number;
  widget_channel_id: string;
  widget_enabled: boolean;
  $add: any[];
  $remove: any[];
}

type K = keyof AuditLogKey;

interface AuditLogChange {
  new_value?: AuditLogKey[K];
  old_value?: AuditLogKey[K];
  key: K;
}

interface AuditLogEntryInfo {
  channel_id: string;
  count: string;
  delete_member_days: string;
  id: string;
  members_removed: string;
  message_id: string;
  role_name: string;
  type: string;
}

export {
  AuditLog,
  AuditLogEvent,
  AuditLogEntryInfo,
  AuditLogEntry,
  AuditLogChange
};
