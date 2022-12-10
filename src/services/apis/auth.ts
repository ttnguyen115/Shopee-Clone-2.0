import http from 'src/services'
import type { AuthResponse } from 'src/types/auth'
import { UrlPaths } from './urlPaths'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(UrlPaths.URL_REGISTER, body)
  },

  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(UrlPaths.URL_LOGIN, body)
  },

  logout() {
    return http.post(UrlPaths.URL_LOGOUT)
  }
}

export default authApi
