import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { User } from '../models/user'

let mongoServer: MongoMemoryServer

const connectDB = async () => {
  if(mongoose.connection.readyState !== 0){
    await mongoose.connection.close()
  }
  if(mongoServer){
    await mongoServer.stop()
  }
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export { connectDB, clearDB, disconnectDB, usersInDb }