import axios, { AxiosRequestConfig } from 'axios'
const API_URL = `http://localhost:5000`
const config: AxiosRequestConfig = {
  baseURL: API_URL,
  withCredentials: true,
}
export const axiosInstance = axios.create(config)
