import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import app from '../app'
import { Blog } from '../models/blog'
import { clearDB, connectDB, disconnectDB } from '../utils/mongo_helper'
import { blogList } from './mock_data'
import { BlogDB } from '../types'

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

describe('When GET request used', () => {
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

  test('id field defined instead of _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
  })
})

describe('When POST request used', () => {
  test('a valid blog can be added', async() => {
    const newBlog:BlogDB = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 1,
    }
    await api.post('/api/blogs').
      send(newBlog).
      expect(201).
      expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titlesList: string[] = response.body.map((e:BlogDB) => e.title)
    expect(response.body).toHaveLength(blogList.length + 1)
    expect(titlesList).toContain('Test blog')
  })
})