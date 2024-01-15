import { describe, expect, test, beforeAll, beforeEach, afterAll } from '@jest/globals'
import addToList from '../src/commands/addToList'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectMongo, disconnectMongo } from '../src/mongo'
import showList from '../src/commands/showList'
import ListItem from '../src/models/ListItem'
import { saveListItem } from '../src/services/persistence'
import checkItem from '../src/commands/checkItem'
import { I18nCommandContext } from '../src/i18n'

class ContextMock {
  replies: string[] = []
  match?: string = ''

  async reply(text: string) {
    this.replies.push(text)
  }

  static create() {
    return new ContextMock() as unknown as (I18nCommandContext & ContextMock)
  }

  lastReply() {
    return this.replies.at(-1)
  }

  t(key: string) {
    return key
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
    const ctx = ContextMock.create()
    await addToList(ctx)
    expect(ctx.lastReply()).toBe(ctx.t('specify-item-add'))
  })

  test('Responds to showList on empty list', async () => {
    const ctx = ContextMock.create()
    await showList(ctx)
    expect(ctx.lastReply()).toBe(ctx.t('list-empty'))
  })

  test('Adds item to list on addToList with one item argument', async () => {
    const ctx = ContextMock.create()
    ctx.match = 'Milk 1'
    await addToList(ctx)
    expect(ctx.lastReply()).toBe('Added Milk of quantity 1')
  })

  test('Displays bulleted list with items on showList', async () => {
    const ctx = ContextMock.create()
    await saveListItem('Cheese', 1)
    await showList(ctx)
    expect(ctx.lastReply()).toBe('- 1 Cheese')
  })

  test('Responds to checkItem with no argument', async () => {
    const ctx = ContextMock.create()
    await checkItem(ctx)
    expect(ctx.lastReply()).toBe(ctx.t('check-no-item'))
  })

  test('Responds to nothing found in list on checkItem with item input', async () => {
    const ctx = ContextMock.create()

    await saveListItem('Cheese', 1)

    ctx.match = 'Milk'
    await checkItem(ctx)

    expect(ctx.lastReply()).toBe(ctx.t('item-not-found'))
  })

  test('Responds please choose if many matches AND checks item if match found', async () => {
    const ctx = ContextMock.create()

    await saveListItem('Cheese', 1)
    await saveListItem('Cream cheese', 1)

    ctx.match = 'Cheese'
    await checkItem(ctx)

    expect(ctx.lastReply()).toBe('- 1 Cheese\n- 1 Cream cheese')

    ctx.match = 'Cream cheese'
    await checkItem(ctx)

    expect(ctx.lastReply()).toBe('1 of Cream cheese checked')
  })

  afterAll(async () => {
    await disconnectMongo()
    await mongod.stop()
  })
})