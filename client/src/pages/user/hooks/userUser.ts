import { useMutation } from 'react-query'
import { axiosInstance } from './../../../axios/axiosInstance'
import { User } from '../../../shared/types'

function update(data: User) {
  return axiosInstance.post('/api/user', data)
}

function useUpdate() {
  return useMutation((data: User) => update(data))
}

export { useUpdate }
