import express from 'express'
import { check, param } from 'express-validator'
import { authorization } from '../../utils/checkAuth'
import {
  createJob,
  findJobs,
  getJobDetails,
  applyJob,
  updateJob,
  appliedJobs,
  postedJobs,
} from './jobController'

const jobRouter = express.Router()

jobRouter.get('/getalljobs', findJobs)
jobRouter.get('/appliedjobs', authorization, appliedJobs)
jobRouter.get('/postedjobs', authorization, postedJobs)
jobRouter.get('/:id', getJobDetails)

jobRouter.post(
  '/createjob',
  check('title')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('Title must be 6 characters long'),
  check('companyDescription')
    .exists()
    .isString()
    .isLength({ min: 10 })
    .withMessage('company description must be 20 characters long'),
  check('companyName')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('Company name must be 6 characters long'),
  check('department')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('shortDescription')
    .exists()
    .isString()
    .isLength({ min: 20 })
    .withMessage('Short description must be 20 characters long'),
  check('fullDescription')
    .exists()
    .isString()
    .isLength({ min: 60 })
    .withMessage('Full description must be 60 characters long'),
  check('skillsRequired').exists().isString(),
  check('salaryFrom').exists().isFloat({ min: 1000 }),
  check('salaryTo').exists().isFloat({ min: 1000 }),
  check('experience')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('minimumQualification')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('email').exists().isEmail().withMessage('Provide valid email address'),
  check('phoneNumber')
    .exists()
    .isString()
    .withMessage('Phone Number is required.'),
  authorization,
  createJob
)

jobRouter.post(
  '/applyjob',
  authorization,
  check('jobId').isMongoId().withMessage('provide valid jobid'),
  applyJob
)

jobRouter.patch(
  '/updatejob',
  check('_id').exists().isString().isMongoId().withMessage('Id is required'),
  check('title')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('Title must be 6 characters long'),
  check('companyDescription')
    .exists()
    .isString()
    .isLength({ min: 10 })
    .withMessage('company description must be 20 characters long'),
  check('companyName')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('Company name must be 6 characters long'),
  check('department')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('shortDescription')
    .exists()
    .isString()
    .isLength({ min: 20 })
    .withMessage('Short description must be 20 characters long'),
  check('fullDescription')
    .exists()
    .isString()
    .isLength({ min: 60 })
    .withMessage('Full description must be 60 characters long'),
  check('skillsRequired').exists().isString(),
  check('salaryFrom').exists().isFloat({ min: 1000 }),
  check('salaryTo').exists().isFloat({ min: 1000 }),
  check('experience')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('minimumQualification')
    .exists()
    .isString()
    .withMessage('Department is required.'),
  check('email').exists().isEmail().withMessage('Provide valid email address'),
  check('phoneNumber')
    .exists()
    .isString()
    .withMessage('Phone Number is required.'),
  authorization,
  updateJob
)

export default jobRouter
