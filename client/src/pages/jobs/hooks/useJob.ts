import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { axiosInstance } from '../../../axios/axiosInstance'
import { AppliedJobs, Job, PostedJobs } from '../../../shared/types'
import { queryKeys } from './../../../reqct-query/constants'

async function postJob(data: Job) {
  await axiosInstance.post('/api/job/createjob', data)
}

export function usePostJob() {
  return useMutation((data: Job) => postJob(data))
}
/*
async function getAllJobs(): Promise<AxiosResponse<PaginatedJobs>> {
  return axiosInstance.get('/api/job/getalljobs')
}
export function useGetAllJobs() {
  return useQuery(queryKeys.jobs, getAllJobs)
}
*/

async function getAllJobs(pageParam: any, query = '') {
  let url: string
  if (query.trim()) {
    url = `/api/job/getalljobs/?search=${query}&page=${pageParam}`
  } else {
    url = `/api/job/getalljobs/?page=${pageParam}`
  }

  const results = (await axiosInstance.get(url)).data
  return { results, nextPage: pageParam + 1, totalPages: results.totalPages }
}
export function useGetAllJobs(query: string) {
  return useInfiniteQuery(
    [queryKeys.jobs, query],
    ({ pageParam = 1 }) => getAllJobs(pageParam, query),
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPages
          ? lastPage.nextPage
          : undefined,
    }
  )
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

async function updateJob(data: Job) {
  await axiosInstance.patch('/api/job/updatejob', data)
}

export function useUpdateJob() {
  return useMutation((data: Job) => updateJob(data))
}

async function getAppliedJobs(): Promise<AppliedJobs> {
  return (await axiosInstance.get('/api/job/appliedjobs')).data
}
export function useGetAppliedJobs() {
  return useQuery<AppliedJobs, any>(queryKeys.appliedJobs, getAppliedJobs)
}

async function getPostedJobs(): Promise<PostedJobs[]> {
  return (await axiosInstance.get('/api/job/postedjobs')).data
}
export function useGetPostedJobs() {
  return useQuery<PostedJobs[], any>(queryKeys.postedJobs, getPostedJobs)
}
