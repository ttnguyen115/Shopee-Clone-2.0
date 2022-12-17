import http from 'src/services'
import { UrlPaths } from 'src/services/apis'
import type { User } from 'src/types/user'
import type { SuccessResponse } from 'src/types/utils'

interface BodyUpdateProfile extends Omit<User, '_id' | 'email' | 'roles' | 'createdAt' | 'updatedAt'> {
  password: string
  new_password: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>(UrlPaths.URL_PROFILE)
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>(UrlPaths.URL_USER, body)
  },

  updateAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>(`${UrlPaths.URL_USER}${UrlPaths.URL_UPLOAD_AVATAR}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
