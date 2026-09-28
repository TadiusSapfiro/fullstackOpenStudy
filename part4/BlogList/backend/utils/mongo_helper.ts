import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongoServer: MongoMemoryServer

const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create()
  const URI = mongoServer.getUri()
  await mongoose.connect(URI)
}

const clearDB = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections){
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

const disconnectDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

export { connectDB, clearDB, disconnectDB }