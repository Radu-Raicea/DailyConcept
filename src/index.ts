import * as dotenv from 'dotenv'
dotenv.config()

import { createTable } from './database'
import * as TelegramBot from 'node-telegram-bot-api'

Promise.resolve()
  .then(() => createTable())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })

let telegram = new TelegramBot(process.env.BOT_KEY, { polling: true });

telegram.on('text', message => {
  let text = message.text.toLowerCase();
  let command = /^\/\S+/
  switch (text.match(command)[0]){
    case '/today':
      telegram.sendMessage(message.chat.id, 'Called /today')
      break;
    case '/add':
      telegram.sendMessage(message.chat.id, 'Called /add')
      break;
    case '/remove':
      telegram.sendMessage(message.chat.id, 'Called /remove')
      break;
    case '/list':
      telegram.sendMessage(message.chat.id, 'Called /list')
      break;
    default:
      telegram.sendMessage(message.chat.id, 'Unrecognized command!')
  }
})
