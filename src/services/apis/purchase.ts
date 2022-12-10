import http from 'src/services'
import { UrlPaths } from './urlPaths'

import type { Purchase, PurchaseListStatus } from 'src/types/purchase'
import type { SuccessResponse } from 'src/types/utils'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${UrlPaths.URL_PURCHASES}/${UrlPaths.URL_ADD_TO_CART}`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(UrlPaths.URL_PURCHASES, {
      params
    })
  }
}

export default purchaseApi
