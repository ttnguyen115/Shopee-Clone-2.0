import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants'
import type { AuthResponse } from 'src/types/auth'
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from 'src/utils'
import { UrlPaths } from './apis'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === UrlPaths.URL_LOGIN || url === UrlPaths.URL_REGISTER) {
          const responseData = response.data as AuthResponse
          const {
            data: { access_token, user }
          } = responseData
          this.accessToken = access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLocalStorage()
        }

        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
        }
        if (error) return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
