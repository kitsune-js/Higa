import { LocalizedString } from '.';
import { ChannelType, Message } from './Channel';
import { Emoji } from './Emoji';
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
  dm_permission?: boolean;
  default_member_permissions?: string;
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
  USER = 2,
  CHANNEL = 3
}

interface Component {
  type: ComponentType;
}

enum ComponentType {
  ACTION_ROW = 1,
  BUTTON = 2,
  SELECT_MENU = 3,
  TEXT_INPUT = 4
}

interface ActionRow extends Component {
  type: ComponentType.ACTION_ROW;
  components: (Button | SelectMenu)[];
}

interface Button extends Component {
  type: ComponentType.BUTTON;
  style: ButtonStyle;
  label?: string;
  emoji?: Emoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

enum ButtonStyle {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5
}

interface SelectMenu extends Component {
  type: ComponentType.SELECT_MENU;
  custom_id: string;
  options: SelectMenuOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

interface SelectMenuOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
}

interface TextInput extends Component {
  type: ComponentType.TEXT_INPUT;
  custom_id: string;
  style: TextInputStyle;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

enum TextInputStyle {
  SHORT = 1,
  PARAGRAPH = 2
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
  values: SelectMenuOption[];
  target_id?: string;
  components?: Component[];
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

export {
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
  ApplicationCommandInteractionDataOption,
  ApplicationCommandType,
  GuildApplicationCommandPermissions,
  ApplicationCommandPermissions,
  ApplicationCommandPermissionType,
  Component,
  ComponentType,
  ActionRow,
  Button,
  ButtonStyle,
  SelectMenu,
  SelectMenuOption,
  TextInput,
  TextInputStyle,
  Interaction,
  InteractionType,
  InteractionData,
  ResolvedData,
  MessageInteraction
};
