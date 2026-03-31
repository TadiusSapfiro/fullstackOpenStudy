import { describe, test, expect } from 'vitest'
import { totalLikes } from '../utils/list_helper'
import { blogList } from './mock_data'

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes([blogList[0]])).toBe(7)
  })

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('of a big list is calculated right', () => {
    expect(totalLikes(blogList)).toBe(36)
  })
})
