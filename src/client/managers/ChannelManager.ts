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
} from 'discord-api-types/v9';
import axios from 'axios';

import { CacheManager } from '.';
import { APIVersions } from '../';

class ChannelManager {
  /**
   * Bot's token
   */
  private token: string;
  /**
   * Application's cache
   */
  private cache: CacheManager;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param cache - Application's cache
   * @param version - API Version
   */
  constructor(token: string, cache: CacheManager, version: APIVersions) {
    this.token = token;
    this.cache = cache;
    this.version = version;
  }

  /**
   * Get a channel
   * @param channelID - Channel identifiant
   * @returns Channel Object
   */
  public async getChannel(channelID: string): Promise<RESTGetAPIChannelResult> {
    if (this.cache.channels.has(channelID))
      return <APIChannel>this.cache.channels.get(channelID);
    const res = await axios.get<RESTGetAPIChannelResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );

    this.cache.channels.set(channelID, res.data);
    return res.data;
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
    const res = await axios.patch<RESTPatchAPIChannelResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );

    this.cache.channels.set(channelID, res.data);
    return res.data;
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
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
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
    const res = await axios.get<RESTGetAPIChannelMessagesResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
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
    const res = await axios.get<RESTGetAPIChannelMessageResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
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
    const res = await axios.post<RESTPostAPIChannelMessageResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async crosspostMessage(
    channelID: string,
    messageID: string
  ): Promise<RESTPostAPIChannelMessageCrosspostResult> {
    const res = await axios.post<RESTPostAPIChannelMessageCrosspostResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async editMessage(
    channelID: string,
    messageID: string,
    options: RESTPatchAPIChannelMessageJSONBody
  ): Promise<RESTPatchAPIChannelMessageResult> {
    const res = await axios.patch<RESTPatchAPIChannelMessageResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/${messageID}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async deleteMessage(
    channelID: string,
    messageID: string,
    reason?: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/${messageID}`,
      {
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
    await axios.post(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/bulk-delete`,
      JSON.stringify(options),
      {
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

  public async editChannelPermissions(
    channelID: string,
    overwriteID: string,
    options: RESTPutAPIChannelPermissionJSONBody,
    reason?: string
  ): Promise<void> {
    await axios.put(
      `https://discord.com/api/v${this.version}/channels/${channelID}/permissions/${overwriteID}`,
      JSON.stringify(options),
      {
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

  public async getChannelInvites(
    channelID: string
  ): Promise<RESTGetAPIChannelInvitesResult> {
    const res = await axios.get<RESTGetAPIChannelInvitesResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/invites`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async createChannelInvite(
    channelID: string,
    options: RESTPostAPIChannelInviteJSONBody = {},
    reason?: string
  ): Promise<RESTPostAPIChannelInviteResult> {
    const res = await axios.post<RESTPostAPIChannelInviteResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/invites`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );

    return res.data;
  }

  public async deleteChannelPermission(
    channelID: string,
    overwriteID: string,
    reason?: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/permissions/${overwriteID}`,
      {
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
    const res = await axios.post<RESTPostAPIChannelFollowersResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/followers`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async triggerTypingIndicator(channelID: string): Promise<void> {
    await axios.post(
      `https://discord.com/api/v${this.version}/channels/${channelID}/typing`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async getPinnedMessages(
    channelID: string
  ): Promise<RESTGetAPIChannelPinsResult> {
    const res = await axios.get<RESTGetAPIChannelPinsResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/pins`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async pinMessage(
    channelID: string,
    messageID: string,
    reason?: string
  ): Promise<void> {
    await axios.put(
      `https://discord.com/api/v${this.version}/channels/${channelID}/pins/${messageID}`,
      '',
      {
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
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/pins/${messageID}`,
      {
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
    await axios.put(
      `https://discord.com/api/v${this.version}/channels/${channelID}/recipients/${userID}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  public async groupDMRemoveRecipient(
    channelID: string,
    userID: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/recipients/${userID}`,
      {
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
    const res = await axios.post<RESTPostAPIChannelMessagesThreadsResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/messages/${messageID}/threads`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
    return res.data;
  }

  public async startThreadWithoutMessages(
    channelID: string,
    options: RESTPostAPIChannelThreadsJSONBody,
    reason?: string
  ): Promise<RESTPostAPIChannelThreadsResult> {
    const res = await axios.post<RESTPostAPIChannelThreadsResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/threads`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)',
          'X-Audit-Log-Reason': reason ?? ''
        }
      }
    );
    return res.data;
  }

  public async joinThread(channelID: string): Promise<void> {
    await axios.put(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members/@me`,
      '',
      {
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
    await axios.put(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members/${userID}`,
      '',
      {
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
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members/@me`,
      {
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
    await axios.delete(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members/${userID}`,
      {
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
    const res = await axios.get<APIThreadMember>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members/${userID}`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async listThreadMembers(
    channelID: string
  ): Promise<RESTGetAPIChannelThreadMembersResult> {
    const res = await axios.get<RESTGetAPIChannelThreadMembersResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/thread-members`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  public async listPublicArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const res = await axios.get<RESTGetAPIChannelUsersThreadsArchivedResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/threads/archived/public`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }

  public async listPrivateArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const res = await axios.get<RESTGetAPIChannelUsersThreadsArchivedResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/threads/archived/private`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }

  public async listJoinedPrivateArchivedThreads(
    channelID: string,
    options: RESTGetAPIChannelThreadsArchivedQuery
  ): Promise<RESTGetAPIChannelUsersThreadsArchivedResult> {
    const res = await axios.get<RESTGetAPIChannelUsersThreadsArchivedResult>(
      `https://discord.com/api/v${this.version}/channels/${channelID}/users/@me/threads/archived/private`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params: options
      }
    );
    return res.data;
  }
}

export { ChannelManager };
