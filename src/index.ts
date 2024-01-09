import './bot'
import { connectMongo } from './mongo'

const { MONGO_URL } = process.env
if (!MONGO_URL) {
  throw Error('MONGO_URL variable required')
}
connectMongo(MONGO_URL)
  .catch(e => {
    console.error(e)
  })
