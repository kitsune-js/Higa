import { PresenceUpdateStatus, ThreadAutoArchiveDuration } from 'discord-api-types';
import { Client } from 'higa';
require("dotenv").config()

const client = new Client(
  process.env.DISCORD,
  [
    'GUILD_MESSAGES',
    'GUILDS'
  ]
)

client.on('READY', () => {
  console.log("Connected !")
  client.setStatus(
    {
      status: PresenceUpdateStatus.DoNotDisturb,
      activities: [
        {
          name: "some tests",
          type: 3
        }
      ],
      since: null,
      afk: false
    }
  )
})

client.on('DEBUG', console.log)

client.on("THREAD_CREATE", async thread => {
  console.log(thread.name)
  client.channel.joinThread(thread.id)
})

// quick command handler to test features
client.on("MESSAGE_CREATE", async message => {
  if (message.author.bot) return
  const [cmd, ...args] = message.content.split(" ")
  switch (cmd) {
    case ":thread":
      client.channel.createMessage(message.channel_id,
        {
          content: "Creating thread...",
          message_reference: {
            message_id: message.id
          },
          allowed_mentions: {
            replied_user: false
          }
        })
      switch (args[0]) {
        case "message":
          client.channel.startThreadWithMessages(
            message.channel_id, message.id,
            {
              name: "test",
              auto_archive_duration: ThreadAutoArchiveDuration.OneHour
            }
          )
          break;
        case "no":
          client.channel.startThreadWithoutMessages(message.channel_id,
            {
              name: "test",
              auto_archive_duration: ThreadAutoArchiveDuration.OneHour,
              type: 11
            })
          break;
      }
      break
    case ":pin":
      client.channel.pinMessage(message.channel_id, message.id)
      break
    case ":unpin":
      client.channel.unpinMessage(message.channel_id, args[0])
      break
    case ":typing":
      client.channel.triggerTypingIndicator(message.channel_id)
      break
    case ":follow":
      client.channel.followNewsChannel(
        "932886951349071913",
        {
          webhook_channel_id: message.channel_id
        }
      )
      break
    case ":invite":
      client.channel.createChannelInvite(
        message.channel_id
      ).then(i => {
        client.channel.createMessage(
          message.channel_id,
          {
            content: `htpps://discord.gg/${i.code}`,
            message_reference: {
              message_id: message.id
            },
            allowed_mentions: {
              replied_user: false
            }
          }
        )
      })
      break
    case ":lock":
      client.channel.editChannelPermissions(
        message.channel_id, message.author.id,
        {
          type: 1,
          deny: String(1 << 0),
          allow: "0"
        }
      )
      break
    case ":unlock":
      client.channel.deleteChannelPermission(
        message.channel_id, message.author.id, "Il s'est calmé le vilain"
      ) 
      break
    case ":clear":
      client.channel.bulkDeleteMessages(message.channel_id, 10)
      break
    case ":random":
      client.channel.createMessage(message.channel_id,
        {
          content: Math.random() > 0.5 ? "Pile !" : "Face !"
        }
      )
      break
    case ":edit":
      client.channel.createMessage(message.channel_id,
        {
          content: "Premier message"
        }
      ).then(m => {
        setTimeout(() => {
          client.channel.editMessage(
            m.channel_id, m.id,
            {
              content: "Deuxième message"
            }
          )
        }, 3000);
      })
      break
    case ":ping":
      client.channel.createMessage(message.channel_id, {
        content: "Pong ! 🏓",
        message_reference: {
          message_id: message.id
        },
        allowed_mentions: {
          replied_user: false
        }
      })
      break
    case ":say":
      client.channel.deleteMessage(message.channel_id, message.id)
      client.channel.createMessage(message.channel_id, {
        content: args.join(" ")
      })
      break
    case ":get":
      client.channel.createMessage(message.channel_id, {
        content: "Getting things, check console",
        message_reference: {
          message_id: message.id
        },
        allowed_mentions: {
          replied_user: false
        }
      })
      switch (args[0]) {
        case "channel":
          console.log(await client.channel.getChannel(args[1]))
          break
        case "messages":
          console.log(await client.channel.getChannelMessages(args[1]))
          break
        case "message":
          console.log(await client.channel.getChannelMessage(message.channel_id, message.id))
          break
        case "invites":
          console.log(await client.channel.getChannelInvites(message.channel_id))
          break
        case "pins":
          console.log(await client.channel.getPinnedMessages(message.channel_id))
          break
      }
      break
    case ":modify":
      client.channel.modifyChannel(message.channel_id, {
        topic: args.join(" ")
      })
      break
    case ":del":
      client.channel.deleteChannel(message.channel_id)
      break
  }
}) 