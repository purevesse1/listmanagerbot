import { bot, botStart } from './bot'
import { connectMongo } from './mongo'
import initCommands from './commands/init'

const { MONGO_URL } = process.env
if (!MONGO_URL) {
  throw Error('MONGO_URL variable required')
}
connectMongo(MONGO_URL)
  .then(async () => {
    await initCommands(bot)
    botStart()
  })
  .catch(e => {
    console.error(e)
  })