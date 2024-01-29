import { IListItem, saveListItem } from '../services/persistence'
import { I18nCommandContext } from '../i18n'
import { InlineKeyboard } from 'grammy'

const ITEM_RE = /(.+) (\d)+$/

export default async function(ctx: I18nCommandContext) {
  const parsed = parseAddToList(ctx.match)
  if (!parsed.name) {
    await ctx.reply(ctx.t('specify-item-add'))
    return
  }
  const msg = ctx.t('added-item', { name: parsed.name, qty: parsed.qty })
  const saved = await saveListItem(parsed.name, parsed.qty)
  const inlineKeyboard = new InlineKeyboard().text(ctx.t('check'), saved._id.toString())
  await ctx.reply(msg, { reply_markup: inlineKeyboard })
}

type ParsedItem = Partial<IListItem> & { qty: number }

export function parseAddToList(text: string): ParsedItem {
  const [, name, qty] = text.match(ITEM_RE) || []
  if (qty) {
    return { name, qty: Number(qty) }
  }
  return { name: text || undefined, qty: 1 }
}