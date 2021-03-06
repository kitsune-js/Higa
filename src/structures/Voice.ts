import { GuildMember } from './Guild';

interface VoiceState {
  guild_id?: string;
  channel_id: string;
  user_id: string;
  member?: GuildMember;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp?: number;
}

interface VoiceRegion {
  id: string;
  name: string;
  optimal: boolean;
  deprecated: boolean;
  custom: boolean;
}

export { VoiceState, VoiceRegion };
