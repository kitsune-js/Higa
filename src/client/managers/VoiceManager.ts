import { RESTGetAPIGuildVoiceRegionsResult } from 'discord-api-types';
import fetch from 'node-fetch';
import { Manager } from './DefaultManager';

class VoiceManager extends Manager {
  constructor() {
    super('');
  }

  public async listVoiceRegions(): Promise<RESTGetAPIGuildVoiceRegionsResult> {
    const res = await fetch(`https://discord.com/api/v9/voice/regions`);
    return await res.json();
  }
}

export { VoiceManager };
