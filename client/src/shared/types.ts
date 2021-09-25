export interface Job {
  _id?: string
  title: string
  department: string
  salaryFrom: number
  salaryTo: number
  experience: string
  shortDescription: string
  fullDescription: string
  minimumQualification: string
  skillsRequired: string
  companyName: string
  email: string
  phoneNumber: string
  companyDescription: string
  appliedCandidates?: any[]
  postedBy?: any
  createdAt?: Date
}

export interface User {
  _id?: string
  email: String
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
  createdAt?: Date
  updatedAt?: Date
  appliedJobs?: string[]
}

export interface AppliedJobs {
  _id: string
  appliedJobs: [
    {
      jobId: {
        _id: string
        title: string
        companyName: string
      }
      appliedDate: Date
    }
  ]
}

export interface PostedJobs {
  _id: string
  title: string
  companyName: string
  appliedCandidates: [
    {
      userId: {
        _id: string
        firstName: string
        lastName: string
        appliedJobs: [
          {
            jobId: string
            appliedDate: Date
          }
        ]
      }
      appliedDate: Date
    }
  ]
  createdAt: Date
}
