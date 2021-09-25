import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import { formatError } from '../../utils/formatError'
import User, { CreateJob } from './../../models/userModel'
import { CustomRequest, Params } from './../../types'

async function me(req: Request, res: Response) {
  const user = await User.findById(req.userId).select('-password')
  console.log(user)

  return res.send(user)
}

async function update(req: CustomRequest<CreateJob>, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }

  const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true })
  return res.status(200).send(user)
}

interface ReqParams extends Params {
  userId: string
}

async function getUserInfo(
  req: CustomRequest<any, any, ReqParams>,
  res: Response
) {
  if (!isValidObjectId(req.params.userId))
    return res.status(400).json({ message: 'no data available' })

  const user = await User.findById(req.params.userId).select(
    '-password -appliedJobs'
  )
  if (!user) res.status(400).json({ message: 'user not found' })

  return res.send(user)
}

export { update, me, getUserInfo }
