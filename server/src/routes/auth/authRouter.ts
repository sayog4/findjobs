import express from 'express'
import { check } from 'express-validator'
import { authorization } from '../../utils/checkAuth'
import {
  signUp,
  logIn,
  logOut,
  preSignUp,
  forgotPassword,
  resetPassword,
} from './authController'

const authRouter = express.Router()

authRouter.post(
  '/presignup',
  check('email').exists().isEmail().withMessage('Provide valid email address'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
  check('userName')
    .exists()
    .isString()
    .withMessage('Username must be string')
    .isLength({ min: 4 })
    .withMessage('Username must be 5 characters long'),
  preSignUp
)
authRouter.post(
  '/signup',
  check('token').exists().isString().withMessage('Provide token'),
  signUp
)
authRouter.post(
  '/forgotpassword',
  check('email').exists().isEmail().withMessage('Provide valid email address'),
  forgotPassword
)

authRouter.post(
  '/resetpassword',
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
  check('token').exists().isString().withMessage('Provide token'),
  resetPassword
)

authRouter.post(
  '/login',
  check('email').exists().isEmail().withMessage('Provide valid email address'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
  logIn
)

authRouter.get('/logout', authorization, logOut)

export default authRouter
