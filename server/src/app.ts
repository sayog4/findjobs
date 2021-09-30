import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/authRouter'
import jobRouter from './routes/job/jobRouter'
import userRouter from './routes/user/userRouter'
import path from 'path'

const app: Application = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../build')))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/job', jobRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

export default app
