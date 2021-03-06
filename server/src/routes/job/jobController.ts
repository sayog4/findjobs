import { Response, Request } from 'express'
import { validationResult } from 'express-validator'
import { isValidObjectId } from 'mongoose'
import Job, { CreatejobModel } from './../../models/jobModel'
import { CustomRequest, Params, Query } from '../../types'
import { formatError } from '../../utils/formatError'
import User from '../../models/userModel'
import { emailAfterAppliedToJob } from '../../utils/sgMail'

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
interface SearchQuery extends Query {
  search: string
  page: string
}
async function findJobs(
  req: CustomRequest<any, SearchQuery, any>,
  res: Response
) {
  const pageSize = 6
  const page = Number(req.query.page) || 1
  const keyword = req.query.search
    ? {
        title: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {}
  const count = await Job.countDocuments({ ...keyword })
  const jobs = await Job.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })
  if (!jobs.length) return res.json({ message: 'unable to find any job' })
  const result = {
    jobs,
    totalPages: Math.ceil(count / pageSize),
  }
  return res.status(200).send(result)
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

    const jobApplied = {
      jobId: curJob._id,
      appliedDate: new Date(),
    }
    curUser.appliedJobs.push(jobApplied)
    await curUser.save()

    emailAfterAppliedToJob(
      curJob.companyName,
      curJob.title,
      curUser.userName,
      curUser.email
    )
    return res.json({ message: 'Job applied Successful' })
  } catch (error) {
    return res.status(400).json({ error: 'something went wrong' })
  }
}

async function updateJob(req: CustomRequest<CreatejobModel>, res: Response) {
  await Job.findByIdAndUpdate(req.body._id, req.body)
  return res.json({ message: 'updated!! successfully' })
}

async function appliedJobs(req: Request, res: Response) {
  const jobInfo = await User.findById(req.userId)
    .populate('appliedJobs.jobId', 'title companyName')
    .select('appliedJobs')

  return res.send(jobInfo)
}

async function postedJobs(req: Request, res: Response) {
  const jobs = await Job.find({ postedBy: req.userId })
    .populate('appliedCandidates.userId', 'firstName lastName appliedJobs')
    .select('title companyName createdAt appliedCandidates')

  return res.send(jobs)
}

export {
  createJob,
  findJobs,
  applyJob,
  getJobDetails,
  updateJob,
  appliedJobs,
  postedJobs,
}
