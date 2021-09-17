import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User, { LoginModel } from '../../models/userModel'
import { validationResult } from 'express-validator'
import { formatError } from '../../utils/formatError'
import { generateToken } from '../../utils/jwtToken'
import { CustomRequest } from '../../types'
import { SigninModel } from './../../models/userModel'

const { genSalt, hash, compare } = bcrypt

async function signUp(req: CustomRequest<SigninModel>, res: Response) {
  const errors = validationResult(req)
  // express- validator error formatting

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }

  const { email, password, userName } = req.body

  // check if email is in use
  const result = await User.findOne({ email })

  if (result)
    return res
      .status(400)
      .json({ message: 'Email already exists. Try logging in.' })

  const salt = await genSalt(10)
  const hashedPw = await hash(password, salt)
  const data = {
    userName,
    email,
    password: hashedPw,
  }
  const user = await User.create(data)
  const token = generateToken(user)

  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .status(201)
    .json({ message: 'Sign up successful.' })
}

async function logIn(req: CustomRequest<LoginModel>, res: Response) {
  const errors = validationResult(req)

  // express- validator error formatting
  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }

  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) return res.status(400).json({ message: 'Invalid creadentials.' })

  const isAuthorized = await compare(password, user.password)

  if (!isAuthorized)
    return res.status(400).json({ message: 'Invalid creadentials.' })

  const token = generateToken(user)

  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .status(201)
    .json({ message: 'Login successful.' })
}

export { signUp, logIn }
