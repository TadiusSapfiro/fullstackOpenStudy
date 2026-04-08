const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongoServer

const connectDB = async () => {
  // console.log('connectDB')
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
}

const clearDB = async () => {
  // console.log('clearDB')
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

const disconnectDB = async () => {
  // console.log('disconnectDB')
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

module.exports = {
  connectDB,
  clearDB,
  disconnectDB
}