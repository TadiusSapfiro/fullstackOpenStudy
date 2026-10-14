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

describe('fetching all blogs', () => {
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

describe('addition of a new blog', () => {
  test('a valid blog can be added', async() => {
    const newBlog:BlogDB = {
      title: 'Test blog 1',
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
    expect(titlesList).toContain('Test blog 1')
  })
  test('if field "likes" not in the request, it value = 0',async() => {
    const newBlog:BlogDB = {
      title: 'Test blog 2',
      author: 'Test author',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
    await api.post('/api/blogs').
      send(newBlog).
      expect(201).
      expect('Content-Type', /application\/json/)

    const addedBlog = await Blog.findOne({ title:'Test blog 2' })
    expect(addedBlog?.likes).toBeDefined()
    expect(addedBlog?.likes).toBe(0)

  })
  test('if field "title" not in the request, status 400', async() => {
    const newBlog: Omit<BlogDB, 'title'> = {
      author: 'Test author',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 1,
    }
    await api.post('/api/blogs').
      send(newBlog).
      expect(400)
  })

  test('if field "url" not in the request, status 400', async() => {
    const newBlog:Omit<BlogDB,'url'> = {
      title: 'Test blog 3',
      author: 'Test author',
      likes: 1,
    }
    await api.post('/api/blogs').
      send(newBlog).
      expect(400)
  })
})

describe('deletion of a blog', () => {
  test('a valid blog can be deleted', async() => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd.map(b => b.id)).not.toContain(blogToDelete.id)
  })
})

describe('updating of a blog', () => {
  test('a blog can be updated', async() => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = response.body
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 123321
    const putResponse = await api.
      put(`/api/blogs/${blogToUpdate.id}`).
      send(blogToUpdate).
      expect(200)

    expect(putResponse.body).toBeDefined()
    expect(putResponse.body?.likes).toBe(123321)
    expect(putResponse.body.title).toBe(blogToUpdate.title)

    const updatedBlogInDb = await Blog.findById(blogToUpdate.id)
    expect(updatedBlogInDb?.likes).toBe(123321)
  })
})