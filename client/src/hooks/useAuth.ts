import { message } from 'antd'
import { axiosInstance } from '../axios/axiosInstance'

const SERVER_ERROR = 'There was an error contacting the server.'
interface UseAuth {
  signUp: (token: string) => Promise<any>
  preSignUp: (email: string, password: string, userName: string) => Promise<any>
  logIn: (email: string, password: string) => Promise<any>
  logOut: () => void
}
interface Data {
  email?: string
  password?: string
  userName?: string
  token?: string
}

export function useAuth(): UseAuth {
  async function serverCall(url: string, input: Data) {
    try {
      const { data, status } = await axiosInstance({
        url: url,
        method: 'POST',
        data: input,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return { data, status }
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        return { errors: error?.response?.data?.errors }
      } else if (error?.response?.data?.error) {
        return { errors: error?.response?.data?.error }
      }
      return message.error(
        error?.response?.data?.message ||
          error?.response?.data?.message ||
          SERVER_ERROR
      )
    }
  }

  async function logIn(email: string, password: string) {
    const response = await serverCall('/api/auth/login', {
      email,
      password,
    })

    if (response?.status === 200) {
      message.success(response.data.message)
      setTimeout(() => {
        return (window.location.href = '/')
      }, 1000)
    }
    return response?.errors
  }

  async function signUp(token: string) {
    const response = await serverCall(`/api/auth/signup`, {
      token,
    })
    if (response?.status === 201) {
      message.success(response.data.message)
      setTimeout(() => {
        return (window.location.href = '/')
      }, 1000)
    }
    return response?.errors || response?.error
  }
  async function preSignUp(email: string, password: string, userName: string) {
    const response = await serverCall(`/api/auth/presignup`, {
      email,
      password,
      userName,
    })
    if (response?.status === 200) {
      message.success(response.data.message)
      setTimeout(() => {
        return (window.location.href = '/login')
      }, 1000)
    }
    return response?.errors
  }

  function logOut() {
    return axiosInstance.get('/api/auth/logout')
  }
  return { logIn, signUp, logOut, preSignUp }
}
