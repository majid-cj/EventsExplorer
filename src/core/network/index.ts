import axios from 'axios'
import {URLS} from '~/core/constants'

export const axiosInstance = axios.create({
  baseURL: URLS.BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    timeout: 5000,
  },
})

export const setupNetwork = async () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      return Promise.resolve(config)
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response)
    },
    async (error) => {
      return Promise.reject(error)
    }
  )
}
