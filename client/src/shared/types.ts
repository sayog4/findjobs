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
