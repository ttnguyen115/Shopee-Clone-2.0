import http from 'src/services'
import type { Category } from 'src/types/category'
import type { SuccessResponse } from 'src/types/utils'
import { UrlPaths } from './urlPaths'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(UrlPaths.URL_CATEGORIES)
  }
}

export default categoryApi
