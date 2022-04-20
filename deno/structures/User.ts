import { Integration } from './Guild.ts';

interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: string;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: PremiumType;
  public_flags?: number;
}

enum UserFlags {
  STAFF = 1 << 0,
  PARTNER = 1 << 1,
  HYPESQUAD = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
  HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
  HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
  PREMIUM_EARLY_SUPPORTER = 1 << 9,
  TEAM_PSEUDO_USER = 1 << 10,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  VERIFIED_DEVELOPER = 1 << 17,
  CERTIFIED_MODERATOR = 1 << 18,
  BOT_HTTP_INTERACTIONS = 1 << 19
}

enum PremiumType {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2
}

interface Connection {
  id: string;
  name: string;
  type: string;
  revoked?: boolean;
  integrations?: Integration[];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  visibility: VisibilityType;
}

enum VisibilityType {
  NONE = 0,
  EVERYONE = 1
}

interface ClientStatus {
  descktop?: string;
  mobile?: string;
  web?: string;
}

interface Activity {
  name: string;
  type: ActivityType;
  url?: string;
  created_at: number;
  timestamps?: ActivityTimestamps;
  application_id?: string;
  details?: string;
  state?: string;
  emoji?: ActivityEmoji;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags: ActivityFlags;
  buttons?: ActivityButton[];
}

enum ActivityType {
  GAME = 0,
  STRAM = 1,
  LISTEN = 2,
  WATCH = 3,
  CUSTOM = 4,
  COMPET = 5
}

interface ActivityTimestamps {
  start?: number;
  end?: number;
}

interface ActivityEmoji {
  name: string;
  id?: string;
  animated?: boolean;
}

interface ActivityParty {
  id?: string;
  size?: [number, number];
}
/**
 * @link https://discord.com/developers/docs/topics/gateway#activity-object-activity-asset-image
 */
interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

enum ActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
  PARTY_PRIVACY_FRIENDS = 1 << 6,
  PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
  EMBEDDED = 1 << 8
}

interface ActivityButton {
  label: string;
  url: string;
}

enum StatusType {
  IDLE = 'idle',
  DND = 'dnd',
  // invisible will be marked as offline
  OFFLINE = 'offline',
  INVISIBLE = 'invisible',
  ONLINE = 'online'
}

export { ActivityType, ActivityFlags, StatusType, UserFlags };
export type {
  User,
  Connection,
  ClientStatus,
  Activity,
  ActivityTimestamps,
  ActivityEmoji,
  ActivityParty,
  ActivityAssets,
  ActivitySecrets,
  ActivityButton
};
