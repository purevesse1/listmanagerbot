import { describe, expect, test } from '@jest/globals'
import { parseAddToList } from '../src/commands/addToList'

describe('List command patterns', () => {
  test('add single word returns single word', () => {
    expect(parseAddToList('milk')).toEqual({ name: 'milk', qty: 1 })
  })
  test('empty string returns empty name and qty 1', () => {
    expect(parseAddToList('')).toEqual({ name: undefined, qty: 1 })
  })
  test('add word and number returns word and number', () => {
    expect(parseAddToList('milk 2')).toEqual({ name: 'milk', qty: 2 })
  })
  test('add many words and number returns words as name and number', () => {
    expect(parseAddToList('tasty milk 2')).toEqual({ name: 'tasty milk', qty: 2 })
  })
})