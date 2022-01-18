import { APIChannel, APIMessage } from 'discord-api-types';
import { GatewayActivityUpdateData } from 'discord-api-types/gateway';
import fetch from 'node-fetch';
import WebSocket from 'ws';
import { EventEmitter } from 'node:events';

class DiscordClient extends EventEmitter {
  private readonly token: string;
  private ws: WebSocket = new WebSocket(
    'wss://gateway.discord.gg/?v=9&encoding=json'
  );
  private heartbeat_interval = 0;
  private sequence_number: number | null = null;
  constructor(token?: string, debug?: boolean) {
    super();
    if (!token) throw new Error('NO TOKEN PROVIDED');
    this.token = token;

    this.setupWebSocket();

    this.once('READY', () => {
      setInterval(() => {
        this.ws.send(
          JSON.stringify({
            op: 1,
            d: this.sequence_number
          })
        );
      }, this.heartbeat_interval);
    });

    if (debug) {
      // eslint-disable-next-line no-console
      this.on('DEBUG', console.log);
    }
  }

  async setupWebSocket() {
    this.ws.on('message', (data) => {
      const parsedData = JSON.parse(data.toString());
      if (parsedData.s) this.sequence_number = parsedData.s;
      if (!parsedData.t && !this.heartbeat_interval) {
        this.heartbeat_interval = parsedData.d.heartbeat_interval;
        this.ws.send(
          JSON.stringify({
            op: 2,
            d: {
              token: this.token,
              properties: {
                $os: 'linux',
                $browse: 'disco',
                $device: 'disco'
              },
              intents: 4096
            }
          })
        );
      }
      this.emit('DEBUG', parsedData, this.sequence_number);

      if (parsedData.t) this.handleEvent(parsedData.t, parsedData.d);
    });
  }

  private handleEvent(event: string, object: unknown) {
    this.emit(event, object);
  }

  public setStatus(
    status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline',
    activities: GatewayActivityUpdateData[]
  ) {
    this.ws.send(
      JSON.stringify({
        op: 3,
        d: {
          status,
          afk: false,
          since: null,
          activities
        }
      })
    );
  }

  /**
   * Create a DM channel with someone and return it
   */
  public createDM = async (user: string) => {
    const res = await fetch('https://discord.com/api/v9/users/@me/channels', {
      headers: {
        Authorization: 'Bot ' + this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient_id: user
      }),
      method: 'POST'
    });
    const json: APIChannel = await res.json();
    return json;
  };

  /**
   * Send a message in a channel (only text)
   */
  public sendMessage = async (channel: string, content: string) => {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channel}/messages`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content
        }),
        method: 'POST'
      }
    );
    const json: APIMessage = await res.json();
    return json;
  };

  /**
   * Reply to a message in a given channel (only text)
   */
  public replyToMessage = async (
    channel: string,
    message: string,
    content: string
  ) => {
    const res = await fetch(
      `https://discord.com/api/v9/channels/${channel}/messages`,
      {
        headers: {
          Authorization: 'Bot ' + this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content,
          message_reference: {
            message_id: message
          }
        }),
        method: 'POST'
      }
    );
    const json: APIMessage = await res.json();
    return json;
  };
}

export { DiscordClient };
