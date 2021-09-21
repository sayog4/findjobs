import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/authRouter'
import jobRouter from './routes/job/jobRouter'
import userRouter from './routes/user/userRouter'

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

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/job', jobRouter)

export default app
