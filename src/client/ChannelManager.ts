import {
  APIChannel,
  APIThreadMember,
  RESTGetAPIChannelInvitesResult,
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
  RESTGetAPIChannelPinsResult,
  RESTGetAPIChannelResult,
  RESTGetAPIChannelThreadMembersResult,
  RESTGetAPIChannelThreadsArchivedQuery,
  RESTGetAPIChannelUsersThreadsArchivedResult,
  RESTPatchAPIChannelJSONBody,
  RESTPatchAPIChannelMessageJSONBody,
  RESTPatchAPIChannelMessageResult,
  RESTPatchAPIChannelResult,
  RESTPostAPIChannelFollowersJSONBody,
  RESTPostAPIChannelFollowersResult,
  RESTPostAPIChannelInviteJSONBody,
  RESTPostAPIChannelInviteResult,
  RESTPostAPIChannelMessageCrosspostResult,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIChannelMessageResult,
  RESTPostAPIChannelMessagesBulkDeleteJSONBody,
  RESTPostAPIChannelMessagesThreadsJSONBody,
  RESTPostAPIChannelMessagesThreadsResult,
  RESTPostAPIChannelThreadsJSONBody,
  RESTPostAPIChannelThreadsResult,
  RESTPutAPIChannelPermissionJSONBody,
  RESTPutAPIChannelRecipientJSONBody
} from 'discord-api-types';
import fetch from 'node-fetch';

import { CacheManager, Client } from '.';

class ChannelManager {
  /**
   * Application's token
   */
  private token: string;
  /**
   * Application's cache
   */
  private cache: CacheManager;
  /**
   * Client
   */
  private client: Client;

  /**
   * @param token - Bot's token
   * @param cache - Application's cache
   * @param client - Application's client
   */
  constructor(token: string, cache: CacheManager, client: Client) {
    this.token = token;
    this.cache = cache;
    this.client = client;
  }

  /**
   * Translate an object into query string for GET requests
   * @param options - Object of options
   * @returns Query string
   */
  private optionsToQueryStringParams(options: object): string {
    let params = '?';
    const paramsArray = [];
    for (const t of Object.entries(options)) {
      paramsArray.push(`${t[0]}=${t[1]}`);
    }
    params += paramsArray.join('&');
    return params;
  }

  /**
   * Get a channel
   * @param channelID - Channel identifiant
   * @returns Channel Object
   */
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

  /**
   * Modify a channel
   * @param channelID - Channel identifiant
   * @param options - Option object
   * @param reason - Reason for the modification
   * @returns - New Channel Object
   */
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

  /**
   * Delete a channel
   * @param channelID - Channel Identifiant
   * @param reason - Reason for the deletion
   */
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

  /**
   * Get messages from a Channel
   * @param channelID - Channel Identifiant
   * @param options - Options for the query search
   * @returns Array of messages
   */
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

  /**
   * Get a single message from a channel
   * @param channelID - Channel Identifiant
   * @param messageID - Message Identifiant
   * @returns - Message Object
   */
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

  /**
   * Send a message in a Channel
   * @param channelID - Channel Identifiant
   * @param options - Options for the message sending
   * @returns - Message Object
   */
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

  public async groupDMRemoveRecipient(
    channelID: string,
    userID: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/recipients/${userID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async startThreadWithMessages(
    channelID: string,
    messageID: string,
    options: RESTPostAPIChannelMessagesThreadsJSONBody,
    reason?: string
  ): Promise<RESTPostAPIChannelMessagesThreadsResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}/threads`,
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

  public async startThreadWithoutMessages(
    channelID: string,
    options: RESTPostAPIChannelThreadsJSONBody,
    reason?: string
  ): Promise<RESTPostAPIChannelThreadsResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/threads`,
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

  public async joinThread(channelID: string): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members/@me`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async addThreadMember(
    channelID: string,
    userID: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members/${userID}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async leaveThread(channelID: string): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members/@me`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async removeThreadMember(
    channelID: string,
    userID: string
  ): Promise<void> {
    await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members/${userID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async getThreadMember(
    channelID: string,
    userID: string
  ): Promise<APIThreadMember> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members/${userID}`,
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

  public async listThreadMembers(
    channelID: string
  ): Promise<RESTGetAPIChannelThreadMembersResult> {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/thread-members`,
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

  public async listPublicArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/threads/archived/public${params}`,
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

  public async listPrivateArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/threads/archived/private${params}`,
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

  public async listJoinedPrivateArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const params = options ? this.optionsToQueryStringParams(options) : '';
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channelID}/users/@me/threads/archived/private${params}`,
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
}

export { ChannelManager };
