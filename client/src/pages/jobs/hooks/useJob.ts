import { useMutation, useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../../axios/axiosInstance'
import { Job } from '../../../shared/types'
import { queryKeys } from './../../../reqct-query/constants'

async function postJob(data: Job) {
  await axiosInstance.post('/api/job/createjob', data)
}

export function usePostJob() {
  return useMutation((data: Job) => postJob(data))
}

async function getAllJobs(): Promise<AxiosResponse<Job[]>> {
  return axiosInstance.get('/api/job/getalljobs')
}
export function useGetAllJobs() {
  return useQuery(queryKeys.jobs, getAllJobs)
}

async function getJobDetail(id: string): Promise<Job> {
  return (await axiosInstance.get(`/api/job/${id}`)).data
}

export function useJobDetail(id: string) {
  return useQuery<Job, any>([queryKeys.job, id], () => getJobDetail(id))
}

async function applyJob(jobId: string) {
  await axiosInstance.post('/api/job/applyjob', { jobId })
}

export function useApplyJob() {
  return useMutation<void, any, string, unknown>((jobId: string) =>
    applyJob(jobId)
  )
}
