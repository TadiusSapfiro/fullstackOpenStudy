const { before, beforeEach, after, test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { clearDB, connectDB, disconnectDB } = require('./mongo_helper')
const Note = require('../models/note')
const { initialNotes, notesInDb } = require('./test_helper')
const api = supertest(app)


before(async () => {
  await connectDB()
})

beforeEach(async () => {
  await clearDB()

  await Note.insertMany(initialNotes)
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

  const response = await notesInDb()

  assert.strictEqual(response.length, initialNotes.length)
})

test('a note can be deleted', async () => {
  const notesAtStart = await notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await notesInDb()

  const ids = notesAtEnd.map(n => n.id)
  assert(!ids.includes(noteToDelete.id))

  assert.strictEqual(notesAtEnd.length, initialNotes.length - 1)
})


after(async () => {
  await disconnectDB()
})