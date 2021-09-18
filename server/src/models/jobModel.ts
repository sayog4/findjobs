import { Schema, model, Document } from 'mongoose'
import { IUser } from './userModel'

export interface IJob extends Document {
  title: string
  department: string
  salaryFrom: number
  salaryTo: number
  experience: string
  smallDescription: string
  fullDescription: string
  minimumQualification: string
  skillsRequired: string
  company: string
  email: string
  phoneNumber: string
  companyDescription: string
  appliedCandidates: IUser['_id'][]
  postedBy: IUser['_id']
}

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: String,
      required: true,
    },
    salaryFrom: {
      type: Number,
      required: true,
    },
    salaryTo: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    minimumQualification: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    appliedCandidates: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
)

const Job = model<IJob>('Job', jobSchema, 'Job')

export default Job
