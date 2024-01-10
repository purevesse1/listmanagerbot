import { describe, expect, test, beforeAll, afterAll } from '@jest/globals'
import addToList from '../src/commands/addToList'
import { CommandContext } from 'grammy'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectMongo, disconnectMongo } from '../src/mongo'

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

  test('empty addToList', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    await addToList(ctx)
    expect(ctx.replies[0]).toBe('Please specify what item you would like to add')
  })

  test('item addToList', async () => {
    const ctx = new ContextMock() as unknown as CommandContext<any>
    ctx.match = 'Milk 1'
    await addToList(ctx)
    expect(ctx.replies[0]).toBe('Added Milk of quantity 1')
  })

  afterAll(async () => {
    await disconnectMongo()
    await mongod.stop()
  })
})