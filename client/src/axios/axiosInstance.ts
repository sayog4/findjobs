import axios, { AxiosRequestConfig } from 'axios'
const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5000`
    : `https://findjobs1.herokuapp.com`
const config: AxiosRequestConfig = {
  baseURL: API_URL,
  withCredentials: true,
}
export const axiosInstance = axios.create(config)
