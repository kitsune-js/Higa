import { Channel } from './Channel.ts';
import { Emoji } from './Emoji.ts';
import { GuildScheduledEvent } from './GuildScheduledEvent.ts';
import { StageInstance } from './StageInstance.ts';
import { Sticker } from './Sticker.ts';
import { User } from './User.ts';
import { VoiceState } from './Voice.ts';

interface Guild {
  id: string;
  name: string;
  icon?: string;
  icon_hash?: string;
  splash?: string;
  discovery_splash?: string;
  owner?: boolean;
  owner_id?: string;
  permissions?: string;
  region?: string;
  afk_channel_id?: string;
  afk_timeout?: number;
  widget_enabled?: boolean;
  widget_channel_id?: string;
  verification_level: VerificationLevel;
  default_message_notifications: DefaultMessageNotificationsLevel;
  explicit_content_filter: ExplicitContentFilterLevel;
  roles: any[];
  emojis: Emoji[];
  features: GuildFeature[];
  mfa_level: MFALevel;
  application_id?: string;
  system_channel_id?: string;
  system_channel_flags: SystemChannelFlags;
  rules_channel_id?: string;
  joined_at?: string;
  large?: boolean;
  unavailable?: boolean;
  member_count?: number;
  voice_states?: VoiceState[];
  members?: GuildMember[];
  channels?: Channel[];
  threads?: Channel[];
  presences?: any[];
  max_presences?: number;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: PremiumTier;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: string;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: WelcomeScreen;
  nsfw_level: GuildNSFWLevel;
  stage_instances?: StageInstance[];
  stickers?: Sticker[];
  guild_scheduled_events?: GuildScheduledEvent[];
  premium_progress_bar_enabled: boolean;
}

enum DefaultMessageNotificationsLevel {
  ALL_MESSAGES = 0,
  ONLY_MENTIONS = 1
}

enum ExplicitContentFilterLevel {
  DISABLED = 0,
  MEMBERS_WITHOUT_ROLES = 1,
  ALL_MEMBERS = 2
}

enum MFALevel {
  NONE = 0,
  ELEVATED = 1
}

enum VerificationLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4
}

enum GuildNSFWLevel {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3
}

enum PremiumTier {
  NONE = 0,
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3
}

enum SystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
  SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3
}

enum GuildFeature {
  ANIMATED_BANNER = 'ANIMATED_BANNER',
  ANIMATED_ICON = 'ANIMATED_ICON',
  BANNER = 'BANNER',
  COMMERCE = 'COMMERCE',
  COMMUNITY = 'COMMUNITY',
  DISCOVERABLE = 'DISCOVERABLE',
  FEATURABLE = 'FEATURABLE',
  INVITE_SPLASH = 'INVITE_SPLASH',
  MEMBER_VERIFICATION_GATE_ENABLED = 'MEMBER_VERIFICATION_GATE_ENABLED',
  MONETIZATION_ENABLED = 'MONETIZATION_ENABLED',
  MORE_STICKERS = 'MORE_STICKERS',
  NEWS = 'NEWS',
  PARTNERED = 'PARTNERED',
  PREVIEW_ENABLED = 'PREVIEW_ENABLED',
  PRIVATE_THREADS = 'PRIVATE_THREADS',
  ROLE_ICONS = 'ROLE_ICONS',
  SEVEN_DAY_THREAD_ARCHIVE = 'SEVEN_DAY_THREAD_ARCHIVE',
  THREE_DAY_THREAD_ARCHIVE = 'THREE_DAY_THREAD_ARCHIVE',
  TICKETED_EVENTS_ENABLED = 'TICKETED_EVENTS_ENABLED',
  VANITY_URL = 'VANITY_URL',
  VERIFIED = 'VERIFIED',
  VIP_REGIONS = 'VIP_REGIONS',
  WELCOME_SCREEN_ENABLED = 'WELCOME_SCREEN_ENABLED'
}

interface GuildPreview {
  id: string;
  name: string;
  icon?: string;
  splash?: string;
  discovery_splash?: string;
  emojis: Emoji[];
  features: GuildFeature[];
  approximate_member_count: number;
  approximate_presence_count: number;
  description?: string;
  stickers?: Sticker[];
}

interface GuildWidgetSettings {
  enabled: boolean;
  channel_id: string;
}

interface GetGuildWidget {
  id: string;
  name: string;
  instant_invite?: string;
  channels: Channel[];
  members: GuildMember[];
  presence_count: number;
}

interface GuildMember {
  user: User;
  nick?: string;
  avatar?: string;
  roles: string[];
  joined_at: number;
  premium_since?: number;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: number;
}

interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  enabled: boolean;
  syncing?: boolean;
  role_id?: string;
  enable_emoticons?: boolean;
  expire_behavior?: IntegrationExpireBehavior;
  expire_grace_period?: number;
  user?: User;
  account: IntegrationAccount;
  synced_at?: number;
  subscriber_count?: number;
  revoked?: boolean;
  application: IntegrationApplication;
}

enum IntegrationType {
  twitch = 'twitch',
  youtube = 'youtube',
  discord = 'discord'
}

enum IntegrationExpireBehavior {
  REMOVE_ROLE = 0,
  KICK = 1
}

interface IntegrationAccount {
  id: string;
  name: string;
}

interface IntegrationApplication {
  id: string;
  name: string;
  icon?: string;
  description: string;
  bot?: User;
}

interface Ban {
  reason?: string;
  user: User;
}

interface WelcomeScreen {
  description?: string;
  welcome_channels?: WelcomeScreenChannel[];
}

interface WelcomeScreenChannel {
  channel_id: string;
  description: string;
  emoji_id?: string;
  emoji_name?: string;
}

export {
  DefaultMessageNotificationsLevel,
  ExplicitContentFilterLevel,
  MFALevel,
  VerificationLevel,
  GuildNSFWLevel,
  PremiumTier,
  SystemChannelFlags,
  GuildFeature,
  IntegrationType,
  IntegrationExpireBehavior
};
export type {
  Guild,
  GuildPreview,
  GuildWidgetSettings,
  GetGuildWidget,
  GuildMember,
  Integration,
  IntegrationAccount,
  IntegrationApplication,
  Ban,
  WelcomeScreen,
  WelcomeScreenChannel
};
