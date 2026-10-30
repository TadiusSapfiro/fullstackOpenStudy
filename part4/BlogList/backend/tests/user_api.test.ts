import bcrypt from 'bcrypt'
import { User } from'../models/user'
import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import app from '../app'
import { clearDB, connectDB, disconnectDB, usersInDb } from '../utils/mongo_helper'
import { UserPayload } from '../types'


const api = supertest(app)

beforeAll(async() => {
  await connectDB()
})


afterAll(async() => {
  await disconnectDB()
})

describe('when there is initially one user in db', () => {

  beforeEach(async() => {
    await clearDB()
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser: UserPayload = {
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
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser: UserPayload = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(result.body.error).toContain('expected `username` to be unique')

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  describe('fetching all users', () => {
    test('Users are returned as JSON and status 200', async () => {
      await api.
        get('/api/users').
        expect(200).
        expect('Content-Type', /application\/json/)
    })

    test('All users are returned', async () => {
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(1)
    })

    test('id field defined instead of _id', async () => {
      const response = await api.get('/api/users')
      expect(response.body[0].id).toBeDefined()
      expect(response.body[0]._id).toBeUndefined()
      expect(response.body[0].passwordHash).toBeUndefined()
    })
  })

})


describe('when there is initially 0 users in db', () => {
  beforeEach(async() => {
    await clearDB()
  })
  test('creation fails when username invalid', async () => {
    const newUser: UserPayload = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(result.body.error).toContain('Username must be at least 3 characters long')

    expect(usersAtEnd).toHaveLength(0)
  })

  test('creation fails when password invalid', async () => {
    const newUser: UserPayload = {
      username: 'root',
      name: 'Superuser',
      password: '1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(result.body.error).toContain('Password is required and must be at least 3 characters long')

    expect(usersAtEnd).toHaveLength(0)
  })

  test('creation fails when username is missing', async () => {
    const newUser: Omit<UserPayload, 'username'> = {
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username is required')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(0)
  })

  test('creation fails when password is missing', async () => {
    const newUser: UserPayload = {
      username: 'root',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is required and must be at least 3 characters long')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(0)
  })
})
