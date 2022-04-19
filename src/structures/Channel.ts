import { Application } from './Application';
import { Emoji } from './Emoji';
import { GuildMember } from './Guild';
import { Role } from './Role';
import { Sticker, StickerItem } from './Sticker';
import { User } from './User';

interface Channel {
  id: string;
  type: ChannelType;
  guild_id?: string;
  position?: number;
  permission_overwrites?: Overwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: User[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityMode;
  message_count?: number;
  thread_metadata?: ThreadMetadata;
  member?: ThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: ChannelFlags;
}

enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD = 11,
  GUILD_PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15
}

enum VideoQualityMode {
  AUTO = 1,
  FULL = 2
}

enum ChannelFlags {
  PINNED = 1
}

interface Message {
  id: string;
  channel_id: string;
  guild_id?: string;
  author: User;
  member?: GuildMember;
  content: string;
  timestamp: number;
  edited_timestamp: number;
  tts: boolean;
  mention_everyone: boolean;
  mentions: User[];
  mention_roles: Role[];
  mention_channels: ChannelMention[];
  attachments: Attachment[];
  embeds: Embed[];
  reactions: Reaction[];
  nonce: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: MessageType;
  activity?: MessageActivity;
  application?: Application;
  application_id?: string;
  message_reference?: MessageReference;
  flags?: MessageFlags;
  referenced_message?: Message;
  interaction?: any;
  thread?: Channel;
  components?: StickerItem[];
  sticker_items?: StickerItem[];
  stickers?: Sticker[];
}

enum MessageType {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  GUILD_MEMBER_JOIN = 7,
  USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
  CHANNEL_FOLLOW_ADD = 12,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
  THREAD_CREATED = 18,
  REPLY = 19,
  CHAT_INPUT_COMMAND = 20,
  THREAD_STARTER_MESSAGE = 21,
  GUILD_INVITE_REMINDER = 22,
  CONTEXT_MENU_COMMAND = 23
}

interface MessageActivity {
  type: MessageActivityType;
  party_id: string;
}

enum MessageActivityType {
  JOIN = 1,
  SPECTATE = 2,
  LISTEN = 3,
  JOIN_REQUEST = 5
}

enum MessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7,
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8
}

interface MessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

interface FollowedChannel {
  channel_id: string;
  webhook_id: string;
}

interface Reaction {
  count: number;
  me: boolean;
  emoji: Emoji;
}

interface Overwrite {
  id: string;
  type: OverwriteType;
  allow: string;
  deny: string;
}

enum OverwriteType {
  ROLE = 0,
  MEMBER = 1
}

interface ThreadMetadata {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: number;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: number;
}

interface ThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: number;
  flags: number;
}

interface Embed {
  title?: string;
  type?: EmbedType;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

enum EmbedType {
  IMAGE = 'image',
  VIDEO = 'video',
  GIFV = 'gifv',
  ARTICLE = 'article',
  LINK = 'link'
}

interface EmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface EmbedProvider {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface Attachment {
  id: string;
  filename: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
}

interface ChannelMention {
  id: string;
  guild_id: string;
  type: ChannelType;
  name: string;
}

interface AllowedMentions {
  parse?: AllowedMentionsType[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}

enum AllowedMentionsType {
  ROLE = 'roles',
  USER = 'users',
  EVERYONE = 'everyone'
}

export {
  Channel,
  ChannelType,
  VideoQualityMode,
  ChannelFlags,
  Message,
  MessageType,
  MessageActivity,
  MessageActivityType,
  MessageFlags,
  MessageReference,
  FollowedChannel,
  Reaction,
  Overwrite,
  OverwriteType,
  ThreadMetadata,
  ThreadMember,
  Embed,
  EmbedType,
  EmbedThumbnail,
  EmbedVideo,
  EmbedImage,
  EmbedProvider,
  EmbedAuthor,
  EmbedFooter,
  EmbedField,
  Attachment,
  ChannelMention,
  AllowedMentions,
  AllowedMentionsType
};
