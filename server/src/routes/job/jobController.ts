import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import Job, { CreatejobModel } from './../../models/jobModel'
import { CustomRequest, Params } from '../../types'
import { formatError } from '../../utils/formatError'
import User from '../../models/userModel'

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

async function findJobs(req: Request, res: Response) {
  const jobs = await Job.find({})
  return res.status(200).send(jobs)
}

interface ReqParams extends Params {
  id: string
}

async function getJobDetails(
  req: CustomRequest<any, any, ReqParams>,
  res: Response
) {
  const { id } = req.params
  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'No data avialable' })
  const job = await Job.findById(id)
  if (!job) {
    return res.status(400).json({ message: 'No data avialable' })
  }
  return res.status(200).send(job)
}
interface ApplyJob {
  jobId: string
}
async function applyJob(req: CustomRequest<ApplyJob>, res: Response) {
  const { jobId } = req.body
  if (!isValidObjectId(jobId))
    return res.status(400).json({ message: 'No data available' })

  try {
    const curJob = await Job.findById(jobId)

    if (!curJob) return res.status(400).json({ message: 'No job available' })
    const userApplied = {
      userId: req.userId,
      appliedDate: new Date(),
    }

    curJob.appliedCandidates.push(userApplied)

    await curJob.save()

    const curUser = await User.findById(req.userId)
    if (!curUser) return res.status(400).json({ message: 'User not found' })
    console.log({ curUser })
    const jobApplied = {
      jobId: curJob._id,
      appliedDate: new Date(),
    }
    curUser.appliedJobs.push(jobApplied)
    await curUser.save()
    return res.json({ message: 'Job applied Successful' })
  } catch (error) {
    return res.status(400).json({ error: 'something went wrong' })
  }
}

export { createJob, findJobs, applyJob, getJobDetails }
