import { Bot } from 'grammy'
import addToList from './commands/addToList'

const TOKEN = process.env.TOKEN
const bot = new Bot(String(TOKEN))


bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
bot.command('atl', addToList)
bot.on('message', (ctx) => ctx.reply('Got another message!'))

bot.on('my_chat_member')


bot.start().catch((e: any) => {
  console.error(e)
})
