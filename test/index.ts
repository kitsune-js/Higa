import {
  PresenceUpdateStatus,
  ThreadAutoArchiveDuration
} from 'discord-api-types/v9';
import {
  Client,
  ComponentType,
  InteractionCallbackType,
  InteractionType,
  TextInput
} from 'higa';

require('dotenv').config();

const client = new Client({
  token: process.env.DISCORD ?? '',
  tokenType: 'Bot',
  version: '9',
  intents: ['GUILD_MESSAGES', 'GUILDS'],
  applicationId: '933243168642707466'
});

client.on('READY', () => {
  console.log('Connected !');
  client.setStatus({
    status: PresenceUpdateStatus.DoNotDisturb,
    activities: [
      {
        name: 'some tests',
        type: 3
      }
    ],
    since: null,
    afk: false
  });
});

client.on('DEBUG', console.log);

client.on('THREAD_CREATE', async (thread) => {
  console.log(thread.name);
  client.channel.joinThread(thread.id);
});

// quick command handler to test features
const prefix = '?';
client.on('MESSAGE_CREATE', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const [cmd, ...args] = message.content.replace(prefix, '').split(' ');
  switch (cmd) {
    case 'join-thread':
      client.channel.addThreadMember(message.channel_id, '933287043663003668');
      break;
    case 'leave-thread':
      client.channel.removeThreadMember(
        message.channel_id,
        '933287043663003668'
      );
      break;
    case 'leave':
      client.channel.leaveThread(message.channel_id);
      break;
    case 'thread':
      client.channel.createMessage(message.channel_id, {
        content: 'Creating thread...',
        message_reference: {
          message_id: message.id
        },
        allowed_mentions: {
          replied_user: false
        }
      });
      switch (args[0]) {
        case 'message':
          client.channel.startThreadWithMessages(
            message.channel_id,
            message.id,
            {
              name: 'test',
              auto_archive_duration: ThreadAutoArchiveDuration.OneHour
            }
          );
          break;
        case 'no':
          client.channel.startThreadWithoutMessages(message.channel_id, {
            name: 'test',
            auto_archive_duration: ThreadAutoArchiveDuration.OneHour,
            type: 11
          });
          break;
      }
      break;
    case 'pin':
      client.channel.pinMessage(message.channel_id, message.id);
      break;
    case 'unpin':
      client.channel.unpinMessage(message.channel_id, args[0]);
      break;
    case 'typing':
      client.channel.triggerTypingIndicator(message.channel_id);
      break;
    case 'follow':
      client.channel.followNewsChannel('932886951349071913', {
        webhook_channel_id: message.channel_id
      });
      break;
    case 'invite':
      client.channel.createChannelInvite(message.channel_id).then((i) => {
        client.channel.createMessage(message.channel_id, {
          content: `htpps://discord.gg/${i.code}`,
          message_reference: {
            message_id: message.id
          },
          allowed_mentions: {
            replied_user: false
          }
        });
      });
      break;
    case 'lock':
      client.channel.editChannelPermissions(
        message.channel_id,
        message.author.id,
        {
          type: 1,
          deny: String(1 << 0),
          allow: '0'
        }
      );
      break;
    case 'unlock':
      client.channel.deleteChannelPermission(
        message.channel_id,
        message.author.id,
        "Il s'est calmé le vilain"
      );
      break;
    case 'clear':
      client.channel.bulkDeleteMessages(message.channel_id, 10);
      break;
    case 'random':
      client.channel.createMessage(message.channel_id, {
        content: Math.random() > 0.5 ? 'Pile !' : 'Face !'
      });
      break;
    case 'edit':
      client.channel
        .createMessage(message.channel_id, {
          content: 'Premier message'
        })
        .then((m) => {
          setTimeout(() => {
            client.channel.editMessage(m.channel_id, m.id, {
              content: 'Deuxième message'
            });
          }, 3000);
        });
      break;
    case 'ping':
      client.channel.createMessage(message.channel_id, {
        content: 'Pong ! 🏓',
        message_reference: {
          message_id: message.id
        },
        allowed_mentions: {
          replied_user: false
        }
      });
      break;
    case 'say':
      client.channel.deleteMessage(message.channel_id, message.id);
      client.channel.createMessage(message.channel_id, {
        content: args.join(' ')
      });
      break;
    case 'get':
      client.channel.createMessage(message.channel_id, {
        content: 'Getting things, check console',
        message_reference: {
          message_id: message.id
        },
        allowed_mentions: {
          replied_user: false
        }
      });
      switch (args[0]) {
        case 'channel':
          console.log(await client.channel.getChannel(args[1]));
          break;
        case 'messages':
          console.log(await client.channel.getChannelMessages(args[1]));
          break;
        case 'message':
          console.log(
            await client.channel.getChannelMessage(
              message.channel_id,
              message.id
            )
          );
          break;
        case 'invites':
          console.log(
            await client.channel.getChannelInvites(message.channel_id)
          );
          break;
        case 'pins':
          console.log(
            await client.channel.getPinnedMessages(message.channel_id)
          );
          break;
      }
      break;
    case 'modify':
      client.channel.modifyChannel(message.channel_id, {
        topic: args.join(' '),
        name: (await client.channel.getChannel(message.channel_id)).name ?? '',
        type: 0
      });
      break;
    case 'del':
      client.channel.deleteChannel(message.channel_id);
      break;
    case 'react':
      client.channel.createReaction(message.channel_id, message.id, '🏓');
      break;
    case 'react-custom':
      client.channel.createReaction(
        message.channel_id,
        message.id,
        'shrug:954053771401510912'
      );
      break;
    case 'create-button':
      client.channel.createMessage(message.channel_id, {
        content: 'test',
        components: [
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.BUTTON,
                custom_id: 'test',
                label: 'test',
                style: 1
              }
            ]
          }
        ]
      });
  }
});

client.on('INTERACTION_CREATE', (interaction) => {
  console.log(interaction.token);
  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    client.interaction.createInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionCallbackType.MODAL,
        data: {
          custom_id: 'test',
          title: 'hello',
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  label: 'test',
                  custom_id: 'test_inuput',
                  style: 1
                }
              ]
            }
          ]
        }
      }
    );
  } else if (interaction.type === InteractionType.MODAL_SUBMIT) {
    console.log(JSON.stringify(interaction.data));
    if (!interaction.data?.components) return;
    client.interaction.createInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${interaction.data?.components[0].components
            .map((c) => `${(<TextInput>c).value}`)
            .join(' ')}`
        }
      }
    );

    client.interaction.createFollowupMessage(interaction.token, {
      content: "I'm a followup message"
    });
  }
});
