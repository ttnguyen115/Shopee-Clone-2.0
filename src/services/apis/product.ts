import type { Product, ProductList, ProductListConfig } from 'src/types/product'
import type { SuccessResponse } from 'src/types/utils'
import http from '../http'
import { UrlPaths } from './urlPaths'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(UrlPaths.URL_PRODUCTS, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${UrlPaths.URL_PRODUCTS}/${id}`)
  }
}

export default productApi
