const { before, beforeEach, after, test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { clearDB, connectDB, disconnectDB } = require('./mongo_helper')
const Note = require('../models/note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]
before(async () => {
  await connectDB()
})

beforeEach(async () => {
  await clearDB()

  for (let note of initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})

test('Notes are returned as JSON and status 200', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All notes are returned', async () => {
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, 2)

})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)
})


after(async () => {
  await disconnectDB()
})