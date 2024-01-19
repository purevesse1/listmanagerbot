import { getListItems } from '../services/persistence'
import { I18nCommandContext } from '../i18n'

export default async function(ctx: I18nCommandContext) {
  const items = await getListItems()

  if (!items.length) {
    await ctx.reply(ctx.t('list-empty'))
    return
  }
  const replyItems: string = items.map(item => {
    return ctx.t('show-list', { name: item.name, qty: item.qty })
  }).join('\n')

  await ctx.reply(replyItems)
}