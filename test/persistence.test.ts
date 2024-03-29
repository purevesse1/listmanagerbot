import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import { eachSeries } from 'async'
import { findItems, getAllListItems, IListItem, saveListItem } from '../src/services/persistence'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { disconnectMongo, connectMongo } from '../src/mongo'
import ListItem from '../src/models/ListItem'

let mongod: MongoMemoryServer

describe('Persistence test', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await connectMongo(uri)
  })

  beforeEach(async () => {
    await ListItem.deleteMany()
  })

  test('saving items', async () => {
    const chatId = 1
    const source = [
      { name: 'Honey', qty: 1, chatId },
      { name: 'Sugar', qty: 2, chatId },
    ]

    await eachSeries(source, async (item: Omit<IListItem, '_id'>) => {
      await saveListItem(item.name, item.qty, 1)
    })

    const saved = await getAllListItems(1)

    expect(saved.length).toBe(2)
    expect(saved).toMatchObject(source)
  })

  test('findItems does exact match if search is quoted', async () => {
    await saveListItem('Cream cheese', 1, 1)
    await saveListItem('Cheese', 2, 1)

    expect(await findItems('\'cheese\'', 1)).toMatchObject([{ name: 'Cheese' }])
    expect(await findItems('"cheese"', 1)).toMatchObject([{ name: 'Cheese' }])
    expect(await findItems('«cheese»', 1)).toMatchObject([{ name: 'Cheese' }])
  })

  afterAll(async () => {
    await disconnectMongo()
    await mongod.stop()
  })
})