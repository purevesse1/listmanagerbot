import { describe, expect, test } from '@jest/globals'
import { eachSeries } from 'async'
import { getListItems, IListItem, saveListItem } from '../src/services/persistence'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { disconnectMongo, connectMongo } from '../src/mongo'

describe('Persistence test', () => {
  test('saving items', async () => {
    const source = [
      { name: 'Honey', qty: 1 },
      { name: 'Sugar', qty: 2 },
    ]

    const mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await connectMongo(uri)

    await eachSeries(source, async (item: Omit<IListItem, '_id'>) => {
      await saveListItem(item.name, item.qty)
    })

    const saved = await getListItems()

    expect(saved.length).toBe(2)
    expect(saved).toMatchObject(source)

    await disconnectMongo()
    await mongod.stop()
  })
})