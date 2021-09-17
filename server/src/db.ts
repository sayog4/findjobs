import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connection.once('open', () => {
  console.log('Mongo db connection is ready')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})
const URL = process.env.MONGO_URI as string
async function mongoConnect() {
  await mongoose.connect(URL)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

export { mongoConnect, mongoDisconnect }
