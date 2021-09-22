import express from 'express'
import { check } from 'express-validator'
import { authorization } from '../../utils/checkAuth'
import { update, me } from './userController'

const userRouter = express.Router()

userRouter.get('/me', authorization, me)

userRouter.post(
  '/',
  authorization,
  check('firstName').exists().isString().withMessage('firstname is required'),
  check('lastName').exists().isString().withMessage('lastname is required'),
  check('firstName')
    .exists()
    .isString()
    .isEmail()
    .withMessage('provide valid email'),
  check('mobileNumber').exists().isString().withMessage('provide phone number'),
  check('portfolio')
    .exists()
    .isString()
    .isURL()
    .withMessage('Provide valid url'),
  check('about')
    .exists()
    .isString()
    .isLength({ min: 10 })
    .withMessage('about must be 10 characters long'),
  check('address')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('address must be 6 characters long'),
  check('education.*')
    .exists()
    .isString()
    .withMessage('provide education details'),
  check('skills.*').exists().isString().withMessage('provide skills details'),
  check('projects.*')
    .exists()
    .isString()
    .withMessage('provide education details'),
  check('experience.*')
    .exists()
    .isString()
    .withMessage('provide experience details'),
  update
)

export default userRouter
