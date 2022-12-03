import type { AuthResponse } from 'src/types/auth'
import http from '../http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

export const logout = () => http.post('/logout')
