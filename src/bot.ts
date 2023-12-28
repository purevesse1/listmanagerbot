import { Bot } from 'grammy'

const TOKEN = process.env.TOKEN
const bot = new Bot(String(TOKEN))

// Handle the /start command.
bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
// Handle other messages.
bot.on('message', (ctx) => ctx.reply('Got another message!'))

bot.on('my_chat_member')

// Start the bot.
bot.start().catch((e: any) => {
  console.error(e)
})
