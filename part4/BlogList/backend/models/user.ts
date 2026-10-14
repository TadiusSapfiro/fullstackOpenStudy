import mongoose from 'mongoose'
import { UserDB } from '../types'
const userSchema = new mongoose.Schema<UserDB>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  ],
})

userSchema.set('toJSON', {
  transform: (document,returnedObject:Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = mongoose.model('User', userSchema)