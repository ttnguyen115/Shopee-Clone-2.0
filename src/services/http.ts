import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import { HttpStatusCode } from 'src/constants'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  isAxiosExpiredTokenError,
  isAxiosUnauthorizedError,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from 'src/utils'
import { UrlPaths } from './apis'

import type { AuthResponse, RefreshTokenResponse } from 'src/types/auth'
import type { ErrorResponse } from 'src/types/utils'

// **
// Timeline sample for issue case: duplicate refresh token request
// Purchase (failed): 1 -> 3
// Me (failed): 2 -> 5
// Refresh token for purchase (success): 3 -> 4
// Re-call purchase (success): 4 -> 6
// Refresh token for me (success): 5 -> 6
// Re-call me: 6 -> ...

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // Only use these two expire params for testing/maintenance request/response authorization
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 60 * 60
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
            data: { access_token, user, refresh_token }
          } = responseData
          this.accessToken = access_token
          this.refreshToken = refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(user)
        } else if (url === UrlPaths.URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        // Only toast error when status values are not 422 and 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Unauthorized (401) cases:
        // - Wrong token
        // - Not having token param
        // - Expired token *
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // Cases: Expired token and request is not from request refresh token
          // => refresh token
          if (isAxiosExpiredTokenError(error) && url !== UrlPaths.URL_REFRESH_TOKEN) {
            this.refreshTokenRequest =
              this.refreshTokenRequest ||
              this.handleRefreshToken().finally(() => {
                // Fix ** issue
                setTimeout(() => {
                  this.refreshTokenRequest = null
                }, 10000)
              })
            return this.refreshTokenRequest.then((access_token) => {
              // Continue to resend request
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Cases: Wrong token, Expired token but refresh request failed
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        if (error) return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(UrlPaths.URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.accessToken = ''
        this.refreshToken = ''
        clearLocalStorage()
        throw error
      })
  }
}

const http = new Http().instance

export default http
