import mongoose from 'mongoose'

export async function connectMongo(url: string) {
  await mongoose.connect(url)
  console.log('Mongo connected')
}

export async function disconnectMongo(){
  await mongoose.disconnect()
  console.log('Mongo disconnected')
}