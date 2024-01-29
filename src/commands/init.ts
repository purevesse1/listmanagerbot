import { bot } from '../bot'
import { completeItem } from '../services/persistence'
import mongoose from 'mongoose'

export default async function() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'settings', description: 'Open settings' },
  ])
}

bot.on('callback_query:data', async (ctx) => {
  console.log('Unknown button event with payload', ctx.callbackQuery.data)

  try {
    const _id = new mongoose.Types.ObjectId(ctx.callbackQuery.data)
    await completeItem({ _id })
  } catch (e: any) {
    await ctx.reply(ctx.t('error.unexpected'))
  }

  await ctx.reply(ctx.callbackQuery.data)
  await ctx.answerCallbackQuery()
})