import { useMutation } from 'react-query'

import { axiosInstance } from '../../../axios/axiosInstance'
import { Job } from '../../../shared/types'

async function postJob(data: Job) {
  await axiosInstance.post('/api/job', data)
}

export function usePostJob() {
  return useMutation((data: Job) => postJob(data))
}
