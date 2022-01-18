import { DiscordClient } from 'higa';
require("dotenv").config()

const client = new DiscordClient(process.env.DISCORD)

client.on('READY', () => {
  console.log("Connected !")
  client.setStatus(
    "dnd",
    [
      {
        name: 'some tests',
        type: 3
      }
    ]
  )
})

client.on('DEBUG', console.log)

client.on("MESSAGE_CREATE", message => {
  if (message.content.startsWith("!ping")) {
    client.replyToMessage(message.channel_id, message.id, "Pong !")
  } else if (message.content.startsWith("!say")) {
    client.sendMessage(message.channel_id, message.content.replace("!say", ""))
  }
})