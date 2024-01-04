import { CommandContext } from 'grammy'
import { completeItem, findItems } from '../services/persistence'

export default async function(ctx: CommandContext<any>) {
  const { match } = ctx
  if (!match) {
    await ctx.reply('Specify item name')
    return
  }
  const matching = await findItems(match)
  if (!matching.length) {
    await ctx.reply('No such items in your list')
    return
  }
  if (matching.length > 1) {
    const replyItems: string = matching.map(item => {
      return `- ${item.qty} ${item.name}`
    }).join('\n')

    await ctx.reply(replyItems)
    return
  }
  const [item] = matching
  await completeItem(item)
  await ctx.reply(`${item.qty} of ${item.name} checked`)
}