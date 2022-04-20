interface StageInstance {
  id: string;
  guild_id: string;
  channel_id: string;
  topic: string;
  privacy_level: StageInstancePrivacyLevel;
  discoverable_disabled: boolean;
  guild_scheduled_event_id?: string;
}

enum StageInstancePrivacyLevel {
  PUBLIC = 1,
  GUILD_ONLY = 2
}

export { StageInstancePrivacyLevel };
export type { StageInstance };
