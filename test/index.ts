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

client.on("MESSAGE_CREATE", async message => {
  if (message.content.startsWith("!ping")) {
    client.replyToMessage(message.channel_id, message.id, "Pong !")
  } else if (message.content.startsWith("!say")) {
    client.sendMessage(message.channel_id, message.content.replace("!say", ""))
  } else if (message.content.startsWith("!get")) {
    console.log(await client.channel.getChannel(message.content.replace("!get ", "")))
  } else if (message.content.startsWith("!modify")) {
    console.log(
      await client.channel.modifyChannel(message.channel_id, {
        topic: "Ceci est un test qui marche bien (ou pas)" 
      })
    )
  }
}) 