import { describe, expect, test, beforeAll, beforeEach, afterAll } from '@jest/globals'
import addToList from '../src/commands/addToList'
import { CommandContext } from 'grammy'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectMongo, disconnectMongo } from '../src/mongo'
import showList from '../src/commands/showList'
import ListItem from '../src/models/ListItem'
import { saveListItem } from '../src/services/persistence'

class ContextMock {
  replies: string[] = []
  match?: string = ''

  async reply(text: string) {
    this.replies.push(text)
  }
}

let mongod: MongoMemoryServer

describe('Context tests', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await connectMongo(uri)
  })

  beforeEach(async () => {
    await ListItem.deleteMany()
  })

  test('Responds to addToList with no argument', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    await addToList(ctx)
    expect(ctx.replies[0]).toBe('Please specify what item you would like to add')
  })

  test('Responds to showList on empty list', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    await showList(ctx)
    expect(ctx.replies[0]).toBe('Your list is empty')
  })

  test('Adds item to list on addToList with one item argument', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    ctx.match = 'Milk 1'
    await addToList(ctx)
    expect(ctx.replies[0]).toBe('Added Milk of quantity 1')
  })

  test('Displays bulleted list with items on showList', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    await saveListItem('Cheese', 1)
    await showList(ctx)
    expect(ctx.replies[0]).toBe('- 1 Cheese')
  })

  afterAll(async () => {
    await disconnectMongo()
    await mongod.stop()
  })
})