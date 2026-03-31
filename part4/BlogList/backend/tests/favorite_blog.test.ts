import { describe, test, expect } from 'vitest'
import { favoriteBlog } from '../utils/list_helper'
import { blogList } from './mock_data'

describe('favorite blog', () => {
  test('when array is empty', () => {
    expect(favoriteBlog([])).toBe(undefined)
  })

  test('when one blog in array', () => {
    expect(favoriteBlog([blogList[0]])).toStrictEqual(blogList[0])
  })

  test('when many blogs in array', () => {
    expect(favoriteBlog(blogList)).toStrictEqual(blogList[2])
  })
})