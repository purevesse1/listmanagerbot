import './bot'
import initMongo from './mongo'

const { MONGO_URL } = process.env
if (!MONGO_URL) {
  throw Error('MONGO_URL variable required')
}
initMongo(MONGO_URL)
  .catch(e => {
    console.error(e)
  })
