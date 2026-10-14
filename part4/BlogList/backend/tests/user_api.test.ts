import bcrypt from 'bcrypt'
import { User } from'../models/user'
import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import app from '../app'
import { Blog } from '../models/blog'
import { clearDB, connectDB, disconnectDB, usersInDb } from '../utils/mongo_helper'
import { initialBlogs } from './mock_data'

const api = supertest(app)

beforeAll(async() => {
  await connectDB()
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})


beforeEach(async() => {
  await clearDB()
  await Blog.insertMany(initialBlogs)
})

afterAll(async() => {
  await disconnectDB()
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames.includes(newUser.username))
  })
})