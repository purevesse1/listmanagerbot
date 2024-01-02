import { CommandContext } from 'grammy'

const ITEM_RE = /(.+) (\d)+$/

export default async function(ctx: CommandContext<any>) {
  const parsed = parseAddToList(ctx.match)
  if (!parsed.name) {
    await ctx.reply('Please specify what item you would like to add')
    return
  }
  const msg = `Added ${parsed.name} of quantity ${parsed.qty}`
  await ctx.reply(msg)
}

interface ParsedText {
  name?: string
  qty: number
}

export function parseAddToList(text: string): ParsedText {
  const [, name, qty] = text.match(ITEM_RE) || []
  if (qty) {
    return { name, qty: Number(qty) }
  }
  return { name: text || undefined, qty: 1 }
}