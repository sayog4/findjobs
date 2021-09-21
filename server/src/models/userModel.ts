import { Schema, model, Document } from 'mongoose'
import { IJob } from './jobModel'

export interface CreateJob extends Document {
  email: String
  password: string
  userName: string
  firstName: string
  lastname: string
  mobileNumber: string
  portfolio: string
  about: string
  address: string
  education: string[]
  skills: string[]
  projects: string[]
  experience: string[]
}

export interface IUser extends Document {
  email: String
  password: string
  userName: string
  firstName?: string
  lastname?: string
  mobileNumber?: string
  portfolio?: string
  about?: string
  address?: string
  education?: string[]
  skills?: string[]
  projects?: string[]
  experience?: string[]
  appliedJobs: IJob['_id'][]
}
export interface SigninModel extends Document {
  email: String
  password: string
  userName: string
}

export interface LoginModel extends Document {
  email: String
  password: string
}

const userSchema = new Schema(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    mobileNumber: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    education: {
      type: [],
      default: [''],
    },
    skills: {
      type: [],
      default: [''],
    },
    projects: {
      type: [],
      default: [''],
    },
    experience: {
      type: [],
      default: [''],
    },
    appliedJobs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Job',
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
)

const User = model<IUser>('User', userSchema, 'User')

export default User
