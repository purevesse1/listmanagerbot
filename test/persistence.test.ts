import { describe, expect, test } from '@jest/globals'
import { eachSeries } from 'async'
import { getListItems, IListItem, saveListItem } from '../src/services/persistence'

describe('Persistence test', () => {
  test('saving items', async () => {
    const source = [
      { name: 'Honey', qty: 1 },
      { name: 'Sugar', qty: 2 },
    ]

    await eachSeries(source, async (item: IListItem) => {
      await saveListItem(item.name, item.qty)
    })

    const saved = await getListItems()

    expect(saved.length).toBe(2)
    expect(saved).toEqual(source)
  })
})