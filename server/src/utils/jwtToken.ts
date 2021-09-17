import jwt from 'jsonwebtoken'
import { IUser } from '../models/userModel'

function generateToken(user: IUser) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
}

export { generateToken }
