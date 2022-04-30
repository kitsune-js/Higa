import axios, { AxiosError } from 'axios';
import { APIVersions, ExecuteWebhookOptions } from '../..';
import {
  InteractionAutocompleteResponse,
  InteractionMessageResponse,
  InteractionModalResponse,
  InteractionResponse,
  Message
} from '../../structures';

class InteractionManager {
  /**
   * Application's id
   */
  readonly #applicationId: string;

  /**
   * API Version
   */
  public readonly version: APIVersions;

  /**
   * @param applicationId - Application's id
   * @param version - API Version
   */
  constructor(applicationId: string, version: APIVersions) {
    this.#applicationId = applicationId;
    this.version = version;
  }

  /**
   * Sends a response to an interaction
   * @param {string} interactionId - The ID of the interaction.
   * @param {string} interactionToken - The token that was sent to you in the interaction request.
   * @param {| InteractionResponse
   *       | InteractionMessageResponse
   *       | InteractionAutocompleteResponse
   *       | InteractionModalResponse} interactionResponse - The response to the interaction.
   */
  public async createInteractionResponse(
    interactionId: string,
    interactionToken: string,
    interactionResponse:
      | InteractionResponse
      | InteractionMessageResponse
      | InteractionAutocompleteResponse
      | InteractionModalResponse
  ): Promise<void> {
    await axios.post(
      `https://discord.com/api/v${this.version}/interactions/${interactionId}/${interactionToken}/callback`,
      JSON.stringify(interactionResponse),
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
   * Get the original message that was sent by the user that triggered the interaction
   * @param {string} interactionToken - The token that was sent to the user when they clicked the
   * button.
   * @returns The original message that was sent to the webhook.
   */
  public async getOriginalInteractionResponse(
    interactionToken: string
  ): Promise<Message> {
    const res = await axios.get<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${interactionToken}/messages/@original`,
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
   * Edit the original message that triggered the webhook
   * @param {string} iterationToken - The token that was returned from the original webhook execution.
   * @param {ExecuteWebhookOptions} options - ExecuteWebhookOptions
   * @returns Message object.
   */
  public async editOriginalInteractionResponse(
    iterationToken: string,
    options: ExecuteWebhookOptions
  ): Promise<Message> {
    const res = await axios.patch<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${iterationToken}/messages/@original`,
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
   * Delete the original message that was sent by the bot
   * @param {string} iterationToken - The iteration token of the original interaction.
   */
  public async deleteOriginalInteractionResponse(
    iterationToken: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${iterationToken}/messages/@original`,
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
   * Create a followup message to the message that triggered the webhook
   * @param {string} interactionToken - The token that was returned from the createInteraction
   * function.
   * @param {ExecuteWebhookOptions} otpions - ExecuteWebhookOptions
   * @returns Message object
   */
  public async createFollowupMessage(
    interactionToken: string,
    otpions: ExecuteWebhookOptions
  ): Promise<Message> {
    console.log(this.#applicationId);
    const res = await axios.post<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${interactionToken}`,
      JSON.stringify(otpions),
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
   * Get a followup message from a message
   * @param {string} interactionToken - The token that was sent to the client when the message was
   * sent.
   * @param {string} messageId - The ID of the message you want to get.
   * @returns Message object
   */
  public async getFollowupMessage(
    interactionToken: string,
    messageId: string
  ): Promise<Message> {
    const res = await axios.get<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${interactionToken}/messages/${messageId}`,
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
   * Edit a followup message from a message
   * @param {string} interactionToken - The token that was sent to the client when the message was
   * sent.
   * @param {string} messageId - The ID of the message you want to edit.
   * @param {ExecuteWebhookOptions} otpions - ExecuteWebhookOptions
   * @returns Message object
   */
  public async editFollowupMessage(
    interactionToken: string,
    messageId: string,
    otpions: ExecuteWebhookOptions
  ): Promise<Message> {
    const res = await axios.patch<Message>(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${interactionToken}/messages/${messageId}`,
      JSON.stringify(otpions),
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
   * Delete a followup message from a message
   * @param {string} interactionToken - The token that was sent to the client when the message was
   * sent.
   * @param {string} messageId - The ID of the message you want to delete.
   */
  public async deleteFollowupMessage(
    interactionToken: string,
    messageId: string
  ): Promise<void> {
    await axios.delete(
      `https://discord.com/api/v${this.version}/webhooks/${
        this.#applicationId
      }/${interactionToken}/messages/${messageId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Higa (https://github.com/fantomitechno/Higa, 1.0.0-dev)'
        }
      }
    );
  }
}

export { InteractionManager };
