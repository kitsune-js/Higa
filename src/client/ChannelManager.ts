import { CacheManager } from './CacheManager';
import {
  APIChannel,
  RESTGetAPIChannelMessagesQuery,
  RESTPatchAPIChannelJSONBody,
  RESTPostAPIChannelMessageJSONBody,
  RESTPatchAPIChannelMessageJSONBody,
  RESTPostAPIChannelMessagesBulkDeleteJSONBody,
  RESTPutAPIChannelPermissionJSONBody,
  RESTGetAPIChannelInvitesResult,
  RESTPatchAPIChannelMessageResult,
  RESTPostAPIChannelMessageResult,
  RESTPostAPIChannelMessageCrosspostResult,
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesResult,
  RESTPatchAPIChannelResult,
  RESTGetAPIChannelResult,
  RESTPostAPIChannelInviteJSONBody,
  RESTPostAPIChannelInviteResult,
  RESTPostAPIChannelFollowersResult,
  RESTPostAPIChannelFollowersJSONBody,
  RESTGetAPIChannelPinsResult,
  RESTPutAPIChannelRecipientJSONBody,
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

  public async getChannel(channelID: string): Promise<RESTGetAPIChannelResult> {
    if (this.cache.channels.has(channelID))
      return <APIChannel>this.cache.channels.get(channelID);
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}`,
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

    const json = await res.json();
    this.cache.channels.set(channelID, json);
    return json;
  }

  public async modifyChannel(
    channelID: string,
    options: RESTPatchAPIChannelJSONBody,
    reason?: string
  ): Promise<RESTPatchAPIChannelResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}`,
      {
        method: 'PATCH',
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

    const json = await res.json();
    this.cache.channels.set(channelID, json);
    return json;
  }

  public async deleteChannel(
    channelID: string,
    reason?: string
  ): Promise<void> {
    await fetch(`https://discord.com/api/v9/channels/${channelID}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
        'X-Audit-Log-Reason': reason ?? ''
      }
    });
    this.cache.channels.delete(channelID);
  }

  public async getChannelMessages(
    channelID: string,
    options?: RESTGetAPIChannelMessagesQuery
  ): Promise<RESTGetAPIChannelMessagesResult> {
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages${params}`,
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
  ): Promise<RESTGetAPIChannelMessageResult> {
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
  ): Promise<RESTPostAPIChannelMessageResult> {
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
  ): Promise<RESTPostAPIChannelMessageCrosspostResult> {
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
  ): Promise<RESTPatchAPIChannelMessageResult> {
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

  public async editChannelPermissions(
    channelID: string,
    overwriteID: string,
    options: RESTPutAPIChannelPermissionJSONBody,
    reason?: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/permissions/${overwriteID}`,
      {
        method: 'PUT',
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

  public async getChannelInvites(
    channelID: string
  ): Promise<RESTGetAPIChannelInvitesResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/invites`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return await res.json();
  }

  public async createChannelInvite(
    channelID: string,
    options: RESTPostAPIChannelInviteJSONBody = {},
    reason?: string
  ): Promise<RESTPostAPIChannelInviteResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/invites`,
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

    return await res.json();
  }

  public async deleteChannelPermission(
    channelID: string,
    overwriteID: string,
    reason?: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/permissions/${overwriteID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
  }

  public async followNewsChannel(
    channelID: string,
    options: RESTPostAPIChannelFollowersJSONBody
  ): Promise<RESTPostAPIChannelFollowersResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/followers`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        body: JSON.stringify(options)
      }
    );
    return await res.json();
  }

  public async triggerTypingIndicator(channelID: string): Promise<void> {
    await fetch(`https://discord.com/api/v9/channels/${channelID}/typing`, {
      method: 'POST',
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
      }
    });
  }

  public async getPinnedMessages(
    channelID: string
  ): Promise<RESTGetAPIChannelPinsResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/pins`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return await res.json();
  }

  public async pinMessage(
    channelID: string,
    messageID: string,
    reason?: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/pins/${messageID}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
  }

  public async unpinMessage(
    channelID: string,
    messageID: string,
    reason?: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/pins/${messageID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
  }

  public async groupDMAddRecipient(
    channelID: string,
    userID: string,
    options: RESTPutAPIChannelRecipientJSONBody
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/recipients/${userID}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        body: JSON.stringify(options)
      }
    );
  }
}

export { ChannelManager };
