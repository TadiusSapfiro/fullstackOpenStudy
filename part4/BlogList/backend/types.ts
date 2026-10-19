import mongoose from 'mongoose'

export interface BlogDB  {
  title: string,
  author: string,
  url: string,
  likes?: number,
  user: mongoose.Types.ObjectId,
}

export interface UserDB {
  username: string,
  name: string,
  passwordHash: string,
  blogs:mongoose.Types.ObjectId[],
}

export interface UserPayload {
  username: string
  name?: string
  password?: string
}