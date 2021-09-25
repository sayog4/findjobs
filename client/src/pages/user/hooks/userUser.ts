import { useMutation, useQuery } from 'react-query'
import { axiosInstance } from './../../../axios/axiosInstance'
import { User } from '../../../shared/types'
import { queryKeys } from '../../../reqct-query/constants'

function update(data: User) {
  return axiosInstance.post('/api/user', data)
}

function useUpdate() {
  return useMutation((data: User) => update(data))
}

async function getUserInfo(id: string): Promise<User> {
  return (await axiosInstance.get(`/api/user/${id}`)).data
}

function useUserInfo(id: string) {
  return useQuery<User, any>([queryKeys.user, id], () => getUserInfo(id))
}
export { useUpdate, useUserInfo }
