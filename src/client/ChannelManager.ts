import { CacheManager } from './CacheManager';
import {
  APIChannel,
  RESTGetAPIChannelMessagesQuery,
  RESTPatchAPIChannelJSONBody,
  APIMessage,
  RESTPostAPIChannelMessageJSONBody,
  RESTPatchAPIChannelMessageJSONBody,
  RESTPostAPIChannelMessagesBulkDeleteJSONBody
} from 'discord-api-types';
import fetch from 'node-fetch';
import { Client } from './Client';

class ChannelManager {
  private token: string;
  private cache: CacheManager;
  private client: Client;

  constructor(token: string, cache: CacheManager, client: Client) {
    this.token = token;
    this.cache = cache;
    this.client = client;
  }

  private optionsToQueryStringParams(options: object): string {
    let params = '?';
    const paramsArray = [];
    for (const t of Object.entries(options)) {
      paramsArray.push(`${t[0]}=${t[1]}`);
    }
    params += paramsArray.join('&');
    return params;
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
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/channels/${id}/messages${params}`,
      {
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

  public async getChannelMessage(
    channelID: string,
    messageID: string
  ): Promise<APIMessage> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
      {
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

  public async createMessage(
    channelID: string,
    options: RESTPostAPIChannelMessageJSONBody
  ): Promise<APIMessage> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        body: JSON.stringify(options),
        method: 'POST'
      }
    );
    return await res.json();
  }

  public async crosspostMessage(
    channelID: string,
    messageID: string
  ): Promise<APIChannel> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        method: 'POST'
      }
    );
    return await res.json();
  }

  public async editMessage(
    channelID: string,
    messageID: string,
    options: RESTPatchAPIChannelMessageJSONBody
  ): Promise<APIMessage> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        body: JSON.stringify(options),
        method: 'PATCH'
      }
    );
    return await res.json();
  }

  public async deleteMessage(
    channelID: string,
    messageID: string,
    reason?: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        },
        method: 'DELETE'
      }
    );
  }

  public async bulkDeleteMessages(
    channelID: string,
    options: RESTPostAPIChannelMessagesBulkDeleteJSONBody | number,
    reason?: string
  ): Promise<void> {
    if (typeof options == 'number') {
      options = {
        messages: (
          await this.getChannelMessages(channelID, { limit: options })
        ).map((m) => m.id)
      };
    }
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/bulk-delete`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        },
        body: JSON.stringify(options)
      }
    );
  }
}

export { ChannelManager };
