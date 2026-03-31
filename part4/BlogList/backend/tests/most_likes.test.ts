import { describe, test, expect } from 'vitest'
import { mostLikes } from '../utils/list_helper'
import { blogList } from './mock_data'

describe('author has the most likes', () => {
  test('when array is empty', () => {
    expect(mostLikes([])).toBe(undefined)
  })

  test('when one blog in array', () => {
    expect(mostLikes([blogList[0]])).toStrictEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('when many blogs in array', () => {
    expect(mostLikes(blogList)).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})