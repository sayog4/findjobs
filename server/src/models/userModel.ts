import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  email: String
  password: string
  userName?: string
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
  appliedJobs: any[] // put later after creating job model  IJob['_id'];
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
    appliedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  },
  { timestamps: true }
)

const User = model<IUser>('User', userSchema)

export default User
