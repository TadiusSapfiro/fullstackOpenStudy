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

after(async () => {
  await disconnectDB()
})