import { getListItems } from '../services/persistence'
import { I18nCommandContext } from '../i18n'

export default async function(ctx: I18nCommandContext) {
  const items = await getListItems()

  if (!items.length) {
    await ctx.reply('Your list is empty')
    return
  }
  const replyItems: string = items.map(item => {
    return `- ${item.qty} ${item.name}`
  }).join('\n')

  await ctx.reply(replyItems)
}