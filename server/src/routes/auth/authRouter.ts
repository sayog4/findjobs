import express from 'express'
import { check } from 'express-validator'
import { authorization } from '../../utils/checkAuth'
import { signUp, logIn, logOut } from './authController'

const authRouter = express.Router()

authRouter.post(
  '/signup',
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
  signUp
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
