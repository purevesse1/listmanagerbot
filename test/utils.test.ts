import { describe, expect, test } from '@jest/globals'
import * as utils from '../src/services/utils'

describe('Utils test', () => {
  test('isQuoted detects no quotes', () => {
    expect(utils.isQuoted('milk')).toBe(false)
  })
  test('isQuoted detects quotes', () => {
    expect(utils.isQuoted('\'milk\'')).toBe(true)
  })
  test('stripQuotes strips quotes', () => {
    expect(utils.stripQuotes('\'milk\'')).toBe('milk')
  })
})