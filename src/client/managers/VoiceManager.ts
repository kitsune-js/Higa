import { RESTGetAPIGuildVoiceRegionsResult } from 'discord-api-types/v9';
import axios from 'axios';

class VoiceManager {
  public async listVoiceRegions(): Promise<RESTGetAPIGuildVoiceRegionsResult> {
    const res = await axios.get<RESTGetAPIGuildVoiceRegionsResult>(
      `https://discord.com/api/v9/voice/regions`
    );
    return res.data;
  }
}

export { VoiceManager };
