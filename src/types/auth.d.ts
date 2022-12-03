import type { User } from './user'
import type { SuccessResponse } from './utils'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
