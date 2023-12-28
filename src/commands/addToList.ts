import { CommandContext } from 'grammy'

const ITEM_RE = /([^ ]+) ?(\d)*/

export default async function(ctx: CommandContext<any>) {
  const [, item, qty = 1] = ctx.match.match(ITEM_RE) || []
  if (!item) {
    await ctx.reply('Please specify what item you would like to add')
    return
  }
  const msg = `Added ${item} of quantity ${qty}`
  await ctx.reply(msg)
}
