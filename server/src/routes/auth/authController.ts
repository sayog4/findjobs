import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { Secret, sign, verify } from 'jsonwebtoken'

import User, { LoginModel } from '../../models/userModel'
import { validationResult } from 'express-validator'
import { formatError } from '../../utils/formatError'
import { generateToken } from '../../utils/jwtToken'
import { CustomRequest } from '../../types'
import { SigninModel } from './../../models/userModel'
import { decodeToken } from '../../utils/decodeToken'
import { forgotPasswordEmailLink, signUpLinkEmail } from '../../utils/sgMail'

const { genSalt, hash, compare } = bcrypt

async function signUp(req: CustomRequest<{ token: any }>, res: Response) {
  const errors = validationResult(req)
  // express- validator error formatting

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }
  try {
    const result = verify(req.body.token, process.env.JWT_PRE_SIGNUP as Secret)
    if (!result)
      return res.status(400).json({
        message: 'Token is invalid. Try filling registration form again!!',
      })

    const decodedResult = decodeToken(req.body.token)
    const { email, userName, password } = decodedResult
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
        domain: '',
        maxAge: 24 * 60 * 60 * 1000 * 365,
      })
      .status(201)
      .json({ message: 'signUp successful.' })
  } catch (error) {
    // throw new Error(`Token is invalid`)
    return res.status(400).json({
      error: `Token is invalid. Try filling registration form again!!`,
    })
  }
}

async function forgotPassword(
  req: CustomRequest<{ email: string }>,
  res: Response
) {
  const { email } = req.body
  const errors = validationResult(req)
  // express- validator error formatting

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }

  const user = await User.findOne({ email })
  if (!user)
    return res.status(400).json({
      error:
        'User with given email does not exist try registering for new account',
    })

  const token = sign({ _id: user._id }, process.env.JWT_RESET_PW as Secret, {
    expiresIn: '20m',
  })
  await user.updateOne({ resetPasswordLink: token })
  forgotPasswordEmailLink(token, email)
  return res.json({
    message: `Email has been sent to ${email}. Kindly follow the instructions to reset your password. Link will expire in 20 minutes.`,
  })
}

async function resetPassword(
  req: CustomRequest<{ token: string; password: string }>,
  res: Response
) {
  const { token, password } = req.body
  const errors = validationResult(req)
  // express- validator error formatting

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }
  try {
    const result = verify(req.body.token, process.env.JWT_RESET_PW as Secret)
    if (!result)
      return res.status(400).json({
        message: 'Token is invalid. Try filling forgot password form again!!',
      })
    const user = User.findOne({ resetPasswordLink: token })
    if (!user)
      return res.status(400).json({
        message: 'User not found',
      })

    const salt = await genSalt(10)
    const hashedPw = await hash(password, salt)
    await user.updateMany(
      {},
      { $set: { password: hashedPw, resetPasswordLink: '' } }
    )
    // await user.updateOne({ resetPasswordLink: '' })
    // await user.updateOne({ password: hashedPw })

    return res.json({
      message: 'Great! Now you can login with new password',
    })
  } catch (error) {
    return res.status(400).json({
      error: `Token is invalid.`,
    })
  }
}

async function preSignUp(req: CustomRequest<SigninModel>, res: Response) {
  const errors = validationResult(req)
  // express- validator error formatting

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }

  const { email, password, userName } = req.body

  // check if email is in use
  const result = await User.findOne({ email: email })

  if (result)
    return res
      .status(400)
      .json({ message: 'Email already exists. Try logging in.' })

  const token = sign(
    { userName, email, password },
    process.env.JWT_PRE_SIGNUP as Secret,
    {
      expiresIn: '15m',
    }
  )

  // send email with token link
  signUpLinkEmail(token, email)
  return res.json({ message: 'Check your email for account activation link.' })
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
      domain: '',
      maxAge: 24 * 60 * 60 * 1000 * 365,
    })
    .status(200)
    .json({ message: 'Login successful.' })
}

function logOut(req: Request, res: Response) {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Successfully logged out' })
}

export { signUp, logIn, logOut, preSignUp, forgotPassword, resetPassword }
