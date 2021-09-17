import express, { Application } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth/authRouter'

const app: Application = express()

app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)

export default app
