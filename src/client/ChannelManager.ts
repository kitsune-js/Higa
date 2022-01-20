import { CacheManager } from './CacheManager';
import { APIChannel, RESTPatchAPIChannelJSONBody } from 'discord-api-types';
import fetch from 'node-fetch';

class ChannelManager {
  private token: string;
  private cache: CacheManager;

  constructor(token: string, cache: CacheManager) {
    this.token = token;
    this.cache = cache;
  }
}

export { ChannelManager };
