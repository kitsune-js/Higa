import { PresenceUpdateStatus } from 'discord-api-types';
import { Client } from 'higa';
require("dotenv").config()

const client = new Client(
  process.env.DISCORD,
  [
    'GUILD_MESSAGES'
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

// quick command handler to test features
client.on("MESSAGE_CREATE", async message => {
  if (message.author.bot) return
  const [cmd, ...args] = message.content.split(" ")
  switch (cmd) {
    case "!ping":
      client.channel.createMessage(message.channel_id, {
        content: "Pong!",
        message_reference: {
          message_id: message.channel_id
        }
      })
      break
    case "!say":
      client.channel.createMessage(message.channel_id, {
        content: args.join(" ")
      })
      break
    case "!get":
      client.channel.createMessage(message.channel_id, {
        content: "Getting things, check console",
        message_reference: {
          message_id: message.channel_id
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
      }
      break
    case "!modify":
      client.channel.modifyChannel(message.channel_id, {
        topic: args.join(" ")
      })
      break
    case "!del":
      client.channel.deleteChannel(message.channel_id)
      break
  }
}) 