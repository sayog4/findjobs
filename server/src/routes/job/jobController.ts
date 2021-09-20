import { Response } from 'express'
import { validationResult } from 'express-validator'
import Job, { CreatejobModel } from './../../models/jobModel'
import { CustomRequest } from '../../types'
import { formatError } from '../../utils/formatError'

async function createJob(req: CustomRequest<CreatejobModel>, res: Response) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errs = formatError(errors)
    return res.status(400).json({ errors: errs })
  }
  // const {
  //   title,
  //   company,
  //   companyDescription,
  //   fullDescription,
  //   smallDescription,
  //   salaryFrom,
  //   salaryTo,
  //   email,
  //   skillsRequired,
  //   minimumQualification,
  //   phoneNumber,
  //   department,
  //   experience,
  // } = req.body
  const newJobData = {
    ...req.body,
    postedBy: req.userId,
  }
  const job = await Job.create(newJobData)
  return res.status(201).send(job)
}

export { createJob }
