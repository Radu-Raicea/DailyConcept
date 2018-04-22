# Daily Concept Bot
Telegram bot that suggests a concept to learn today from a pre-defined list of concepts

## Running
First, you must create a `.env` file with a Telegram Bot API key (see `example.env`). You can get your key by [downloading the Telegram app](https://telegram.org/apps) and contacting the [BotFather](https://telegram.me/botfather).

Once configured:
```
$ npm install
$ npm start
```

## Usage
Adding a concept: `/add <concept_name>`

Removing a concept: `/remove <concept_name>`

Listing all concepts: `/list`

Getting today's concept (WIP): `/today`

Listing commands (not implemented): `/help`
