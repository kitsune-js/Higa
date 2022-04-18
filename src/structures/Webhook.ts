import { Channel } from './Channel';
import { Guild } from './Guild';
import { User } from './User';

interface Webhook {
  id: string;
  type: WebhookType;
  guild_id?: string;
  channel_id: string;
  user?: User;
  name?: string;
  avatar?: string;
  token?: string;
  application_id?: string;
  source_guild?: Guild;
  source_channel?: Channel;
  url?: string;
}

enum WebhookType {
  INCOMING = 1,
  CHANNEL_FOLLOWER = 2,
  APPLICATION = 3
}

export { Webhook, WebhookType };
