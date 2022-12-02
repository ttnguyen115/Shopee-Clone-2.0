import type { User } from './user'
import type { ResponseApi } from './utils'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
