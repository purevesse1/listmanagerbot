import mongoose from 'mongoose'

export default async function(url: string) {
  await mongoose.connect(url)
  console.log('Mongo connected')
}