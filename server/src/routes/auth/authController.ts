import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/userModel'
import { validationResult } from 'express-validator'
import { formatError } from '../../utils/formatError'
import { generateToken } from '../../utils/jwtToken'
import { CustomRequest } from '../../types'
import { SigninModel } from './../../models/userModel'

const { genSalt, hash } = bcrypt

async function signUp(req: CustomRequest<SigninModel>, res: Response) {
  const errors = validationResult(req)
  // express- validator error formatting
  const errs = formatError(errors)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errs })
  }

  const { email, password, userName } = req.body

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

export { signUp }
