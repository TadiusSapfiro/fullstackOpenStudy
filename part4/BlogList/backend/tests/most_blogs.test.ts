import { describe, test, expect } from 'vitest'
import { mostBlogs } from '../utils/list_helper'
import { blogList } from './mock_data'

describe('most blogs from author', () => {
  test('when array is empty', () => {
    expect(mostBlogs([])).toBe(undefined)
  })

  test('when one blog in array', () => {
    expect(mostBlogs([blogList[0]])).toStrictEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('when many blogs in array', () => {
    expect(mostBlogs(blogList)).toStrictEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})