import axios from 'axios';
import { APIVersions } from '../..';
import {
  ActionRow,
  AllowedMentions,
  Attachment,
  Embed,
  Message,
  Webhook
} from '../../structures';

interface ModifyWebhookOptions {
  name: string;
  avatar: any;
  channel_id: string;
}

interface ExecuteWebhookOptions {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: Embed[];
  allowed_mentions?: AllowedMentions;
  components?: ActionRow[];
  files?: any[];
  playlod_json?: any;
  attachments?: Attachment[];
  flags?: number;
}

interface ExecuteWebhookParams {
  wait?: boolean;
  thread_id?: string;
}

interface GetWebhookMessageParams {
  thread_id?: string;
}

class WebhookManager {
  /**
   * Bot's token
   */
  readonly #token: string | undefined;

  /**
   * Token type
   */
  readonly #tokenType: string | undefined;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param token - Bot's token
   * @param version - API Version
   */
  constructor(version: APIVersions, token?: string, tokenType?: string) {
    this.#token = token;
    this.#tokenType = tokenType;
    this.version = version;
  }

  /**
   * Creates a webhook in the specified channel
   * @param {string} channelId - The channel ID of the channel you want to create the webhook in.
   * @param {string} name - The name of the webhook.
   * @param {any} [avatar] - The avatar of the webhook.
   * @returns Webhook object
   */
  public async createWebhook(
    channelId: string,
    name: string,
    avatar?: any
  ): Promise<Webhook> {
    if (!this.#token) throw new Error('No token provided');
    const res = await axios.post<Webhook>(
      `https://discord.com/api/v${this.version}/channels/${channelId}/webhooks`,
      JSON.stringify({
        name,
        avatar
      }),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Get all webhooks in a channel
   * @param {string} channelId - The ID of the channel you want to get the webhooks from.
   * @returns Array of webhooks
   */
  public async getChannelWebhooks(channelId: string): Promise<Webhook[]> {
    if (!this.#token) throw new Error('No token provided');
    const res = await axios.get<Webhook[]>(
      `https://discord.com/api/v${this.version}/channels/${channelId}/webhooks`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Gets all the webhooks in a guild.
   * @param {string} guildId - The ID of the guild you want to get the webhooks from.
   * @returns Array of webhooks
   */
  public async getGuilWebhooks(guildId: string): Promise<Webhook[]> {
    if (!this.#token) throw new Error('No token provided');
    const res = await axios.get<Webhook[]>(
      `https://discord.com/api/v${this.version}/guilds/${guildId}/webhooks`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Gets a webhook by its ID
   * @param {string} webhookId - The ID of the webhook you want to get.
   * @returns Webhook object.
   */
  public async getWebhook(webhookId: string): Promise<Webhook> {
    if (!this.#token) throw new Error('No token provided');
    const res = await axios.get<Webhook>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Gets a webhook with a token.
   * @param {string} webhookId - The ID of the webhook you want to get.
   * @param {string} webhookToken - The token of the webhook.
   * @returns Webhook object
   */
  public async getWebhookWithToken(
    webhookId: string,
    webhookToken: string
  ): Promise<Webhook> {
    const res = await axios.get<Webhook>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Modify a webhook
   * @param {string} webhookId - The ID of the webhook you want to modify.
   * @param {ModifyWebhookOptions} options - ModifyWebhookOptions
   * @returns Webhook object.
   */
  public async modifyWebhook(
    webhookId: string,
    options: ModifyWebhookOptions
  ): Promise<Webhook> {
    if (!this.#token) throw new Error('No token provided');
    const res = await axios.patch<Webhook>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}`,
      JSON.stringify(options),
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Modify a webhook with a token.
   * @param {string} webhookId - The ID of the webhook you want to modify.
   * @param {string} webhookToken - The token of the webhook.
   * @param {ModifyWebhookOptions} options - ModifyWebhookOptions
   * @returns Webhook object.
   */
  public async modifyWebhookWithToken(
    webhookId: string,
    webhookToken: string,
    options: ModifyWebhookOptions
  ): Promise<Webhook> {
    const res = await axios.patch<Webhook>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}`,
      JSON.stringify(options),
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
    return res.data;
  }

  /**
   * Deletes a webhook
   * @param {string} webhookId - The ID of the webhook you want to delete.
   */
  public async deleteWebhook(webhookId: string): Promise<void> {
    if (!this.#token) throw new Error('No token provided');
    await axios.delete(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}`,
      {
        headers: {
          Authorization: `${this.#tokenType} ${this.#token}`,
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  /**
   * Deletes a webhook with the given ID and token
   * @param {string} webhookId - The ID of the webhook you want to delete.
   * @param {string} webhookToken - The token of the webhook you want to delete.
   */
  public async deleteWebhookWithToken(
    webhookId: string,
    webhookToken: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }

  /**
   * Executes a webhook
   * @param {string} webhookId - The ID of the webhook you want to execute.
   * @param {string} webhookToken - The token of the webhook.
   * @param {ExecuteWebhookOptions} options - ExecuteWebhookOptions
   * @param {ExecuteWebhookParams} params - ExecuteWebhookParams = {}
   * @returns A message object.
   */
  public async executeWebhook(
    webhookId: string,
    webhookToken: string,
    options: ExecuteWebhookOptions,
    params: ExecuteWebhookParams = {}
  ): Promise<Message> {
    const res = await axios.post<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}`,
      JSON.stringify(options),
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params
      }
    );
    return res.data;
  }

  /**
   * Get a webhook message
   * @param {string} webhookId - The ID of the webhook.
   * @param {string} webhookToken - The token of the webhook.
   * @param {string} messageId - The ID of the message to get.
   * @param {GetWebhookMessageParams} params - {
   * @returns A message object.
   */
  public async getWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    params: GetWebhookMessageParams = {}
  ): Promise<Message> {
    const res = await axios.get<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params
      }
    );
    return res.data;
  }

  /**
   * Edit a webhook message
   * @param {string} webhookId - The ID of the webhook you want to send the message to.
   * @param {string} webhookToken - The token of the webhook.
   * @param {string} messageId - The ID of the message you want to edit.
   * @param {ExecuteWebhookOptions} options - ExecuteWebhookOptions
   * @param {ExecuteWebhookParams} params - ExecuteWebhookParams = {}
   * @returns Message object.
   */
  public async editWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    options: ExecuteWebhookOptions,
    params: ExecuteWebhookParams = {}
  ): Promise<Message> {
    const res = await axios.patch<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
      JSON.stringify(options),
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params
      }
    );
    return res.data;
  }

  public async deleteWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    params: ExecuteWebhookParams = {}
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Higa (http://github.com/fantomitechno/Higa, 1.0.0-dev)'
        },
        params
      }
    );
  }
}

export {
  WebhookManager,
  ExecuteWebhookOptions,
  ExecuteWebhookParams,
  GetWebhookMessageParams
};
