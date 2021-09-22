import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { formatError } from '../../utils/formatError'
import User, { CreateJob } from './../../models/userModel'
import { CustomRequest } from './../../types'

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

export { update, me }
