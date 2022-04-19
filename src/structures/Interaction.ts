import { LocalizedString } from '.';
import { ChannelType, Message } from './Channel';
import { GuildMember } from './Guild';
import { User } from './User';

interface ApplicationCommand {
  id: string;
  type?: ApplicationCommandType;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: LocalizedString;
  description: string;
  description_localizations?: LocalizedString;
  options?: ApplicationCommandOption[];
  default_permission?: boolean;
  version: string;
}

enum ApplicationCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3
}

enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11
}

interface ApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  name_localizations?: LocalizedString;
  description: string;
  description_localizations?: LocalizedString;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}

interface ApplicationCommandOptionChoice {
  name: string;
  value: string;
  name_localizations?: LocalizedString;
}

interface ApplicationCommandInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
  value?: string | number;
  options?: ApplicationCommandInteractionDataOption[];
  focused?: boolean;
}

interface GuildApplicationCommandPermissions {
  id: string;
  application_id: string;
  guild_id: string;
  permissions: ApplicationCommandPermissions[];
}

interface ApplicationCommandPermissions {
  id: string;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

enum ApplicationCommandPermissionType {
  ROLE = 1,
  USER = 2
}

interface Interaction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: InteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
  message?: Message;
  locale?: string;
  guild_locale?: string;
}

enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATON_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5
}

interface InteractionData {
  id: string;
  name: string;
  type: number;
  resolved?: ResolvedData;
  options?: ApplicationCommandInteractionDataOption[];
  guild_id?: string;
  custom_id?: string;
  component_type?: number;
  values: any[];
  target_id?: string;
  components?: any[];
}

interface ResolvedData {
  users?: string[];
  members?: string[];
  roles?: string[];
  channels?: string[];
  messages?: string[];
  attachments?: string[];
}

interface MessageInteraction {
  id: string;
  type: InteractionType;
  name: string;
  user: User;
  member: GuildMember;
}
