import express, { Application } from 'express'
import morgan from 'morgan'

const app: Application = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return res.json({ message: 'hello from server' })
})

export default app
