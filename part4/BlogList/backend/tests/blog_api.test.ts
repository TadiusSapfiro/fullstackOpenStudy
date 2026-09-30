import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import app from '../app'
import { Blog } from '../models/blog'
import { clearDB, connectDB, disconnectDB } from '../utils/mongo_helper'
import { blogList } from './mock_data'

const api = supertest(app)

beforeAll(async() => {
  await connectDB()
})


beforeEach(async() => {
  await clearDB()
  await Blog.insertMany(blogList)
})

afterAll(async() => {
  await disconnectDB()
})

describe('GET request', () => {
  test('Blogs are returned as JSON and status 200', async () => {
    await api.
      get('/api/blogs').
      expect(200).
      expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogList.length)
  })
})