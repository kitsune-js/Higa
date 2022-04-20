import { Application } from './Application.ts';
import { Channel } from './Channel.ts';
import { Guild, GuildMember } from './Guild.ts';
import { GuildScheduledEvent } from './GuildScheduledEvent.ts';
import { User } from './User.ts';

interface Invite {
  code: string;
  guild?: Guild;
  channel?: Channel;
  inviter?: User;
  target_type?: InviteTargetType;
  target_user?: User;
  target_application?: Application;
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: number;
  stage_instance?: InviteStageInstance;
  guild_scheduled_event?: GuildScheduledEvent;
  uses?: number;
  max_uses?: number;
  max_age?: number;
  temporary?: boolean;
  created_at?: number;
}

enum InviteTargetType {
  STREAM = 1,
  EMBEDDED_APPLICATION = 2
}

interface InviteStageInstance {
  members: GuildMember[];
  participant_count: number;
  speaker_count: number;
  topic: string;
}

export { InviteTargetType };
export type { Invite, InviteStageInstance };
