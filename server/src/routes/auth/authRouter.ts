import express from 'express'
import { check } from 'express-validator'
import { signUp } from './authController'

const authRouter = express.Router()

authRouter.post(
  '/signup',
  check('email').isEmail().withMessage('Provide valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
  check('userName')
    .isString()
    .withMessage('Username must be string')
    .isLength({ min: 4 })
    .withMessage('Username must be 5 characters long'),
  signUp
)

export default authRouter
