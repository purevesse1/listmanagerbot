import { completeItem, findItems } from '../services/persistence'
import { I18nCommandContext } from '../i18n'

export default async function(ctx: I18nCommandContext) {
  const { match } = ctx
  if (!match) {
    await ctx.reply(ctx.t('check-no-item'))
    return
  }
  const matching = await findItems(match)
  if (!matching.length) {
    await ctx.reply(ctx.t('item-not-found'))
    return
  }
  if (matching.length > 1) {
    const replyItems: string = matching.map(item => {
      return ctx.t('show-matching-items', { name: item.name, qty: item.qty })
    }).join('\n')

    await ctx.reply(replyItems)
    return
  }
  const [item] = matching
  await completeItem(item)
  await ctx.reply(ctx.t('check-item', { name: item.name, qty: item.qty }))
}