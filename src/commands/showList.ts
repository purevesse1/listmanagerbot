import { CommandContext } from 'grammy'
import { getListItems } from '../services/persistence'

export default async function(ctx: CommandContext<any>) {
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