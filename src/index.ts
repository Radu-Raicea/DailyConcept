import * as dotenv from 'dotenv'
dotenv.config()

import { createTable, addConcept, removeConcept, listConcepts, getConcept } from './database'
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
      getConcept()
        .then(concept => telegram.sendMessage(message.chat.id, `Here's the concept you should learn today: ${concept}.`))
        .catch(err => telegram.sendMessage(message.chat.id, err.toString()))
      break;
    case '/add':
      addConcept(text.replace('/add ', ''))
        .then(() => telegram.sendMessage(message.chat.id, 'Concept added!'))
        .catch(err => telegram.sendMessage(message.chat.id, err.toString()))
      break;
    case '/remove':
      removeConcept(text.replace('/remove ', ''))
        .then(() => telegram.sendMessage(message.chat.id, 'Concept removed!'))
        .catch(err => telegram.sendMessage(message.chat.id, err.toString()))
      break;
    case '/list':
      listConcepts()
        .then(concepts => telegram.sendMessage(message.chat.id, `List of concepts:\n${concepts.join('\n')}`))
        .catch(err => telegram.sendMessage(message.chat.id, err.toString()))
      break;
    default:
      telegram.sendMessage(message.chat.id, 'Unrecognized command!');
  }
})
