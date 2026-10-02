import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import app from '../app'
import { Blog } from '../models/blog'
import { clearDB, connectDB, disconnectDB } from '../utils/mongo_helper'
import { initialBlogs } from './mock_data'
import { BlogDB } from '../types'

const api = supertest(app)

beforeAll(async() => {
  await connectDB()
})


beforeEach(async() => {
  await clearDB()
  await Blog.insertMany(initialBlogs)
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
    expect(response.body).toHaveLength(initialBlogs.length)
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

    const blogList = await Blog.find({})
    const titlesList: string[] = blogList.map((e:BlogDB) => e.title)
    expect(blogList).toHaveLength(initialBlogs.length + 1)
    expect(titlesList).toContain('Test blog')
  })
  test('if field "likes" not in the request, it value = 0',async() => {
    const newBlog:BlogDB = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    await api.post('/api/blogs').
      send(newBlog).
      expect(201).
      expect('Content-Type', /application\/json/)

    const addedBlog = await Blog.findOne({ title:'Test blog' })
    expect(addedBlog?.likes).toBeDefined()
    expect(addedBlog?.likes).toBe(0)

  })
})