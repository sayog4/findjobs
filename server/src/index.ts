import http from 'http'
import dotenv from 'dotenv'
import app from './app'
import { mongoConnect } from './db'
dotenv.config()

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

async function startServer() {
  await mongoConnect()

  server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

startServer()
