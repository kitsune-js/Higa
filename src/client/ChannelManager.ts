import { CacheManager } from './CacheManager';
import { APIChannel, RESTPatchAPIChannelJSONBody } from 'discord-api-types';
import {
  APIChannel,
  RESTGetAPIChannelMessagesQuery,
  RESTPatchAPIChannelJSONBody,
  APIMessage,
} from 'discord-api-types';
import fetch from 'node-fetch';

class ChannelManager {
  private token: string;
  private cache: CacheManager;

  constructor(token: string, cache: CacheManager) {
    this.token = token;
    this.cache = cache;
  }

  public async getChannel(id: string): Promise<APIChannel> {
    if (this.cache.channels.has(id))
      return <APIChannel>this.cache.channels.get(id);
    const res = await fetch(`https://discord.com/api/v9/channels/${id}`, {
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
      },
      method: 'GET'
    });

    const json = await res.json();
    this.cache.channels.set(id, json);
    return json;
  }

  public async modifyChannel(
    id: string,
    options: RESTPatchAPIChannelJSONBody,
    reason?: string
  ): Promise<APIChannel> {
    const res = await fetch(`https://discord.com/api/v9/channels/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
        'X-Audit-Log-Reason': reason ?? ''
      },
      body: JSON.stringify(options)
    });

    const json = await res.json();
    this.cache.channels.set(id, json);
    return json;
  }

  public async deleteChannel(id: string, reason?: string): Promise<APIChannel> {
    const res = await fetch(`https://discord.com/api/v9/channels/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
        'X-Audit-Log-Reason': reason ?? ''
      }
    });

    const json = await res.json();
    this.cache.channels.delete(id);
    return json;
  }

  public async getChannelMessages(
    id: string,
    options?: RESTGetAPIChannelMessagesQuery
  ): Promise<APIMessage[]> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${id}/messages`,
      {
        body: JSON.stringify(options),
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        method: 'GET'
      }
    );
    return await res.json();
  }

}

export { ChannelManager };
