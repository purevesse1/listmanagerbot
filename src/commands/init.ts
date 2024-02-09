import { completeItem } from '../services/persistence'
import mongoose from 'mongoose'
import { Bot, Context } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

export default async function(bot: Bot<Context & I18nFlavor>) {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'settings', description: 'Open settings' },
  ])
  bot.on('callback_query:data', async (ctx) => {
    console.log(ctx.callbackQuery.data, ctx.callbackQuery.message?.message_id)

    try {
      const _id = new mongoose.Types.ObjectId(ctx.callbackQuery.data)
      const result = await completeItem({ _id })
      const id = ctx.callbackQuery.message?.chat.id
      const messageId = ctx.callbackQuery.message?.message_id
      if (id && messageId) {
        await ctx.api.deleteMessage(id, messageId)
      }
      const reply = result.deletedCount ? ctx.t('checked-pop-up') : ctx.t('no-item-pop-up')
      await ctx.answerCallbackQuery(reply)
    } catch (e: any) {
      await ctx.reply(ctx.t('error.unexpected'))
    }

  })
}
