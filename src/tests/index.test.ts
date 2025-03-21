import { describe, expect, test } from '@jest/globals'
import { add } from '../app'

describe('Add function', () => {
  test('Return correct value', () => {
    expect(add(2, 5)).toEqual(7)
  })
})
