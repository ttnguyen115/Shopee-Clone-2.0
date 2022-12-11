import http from 'src/services'
import { UrlPaths } from './urlPaths'

import type { Purchase, PurchaseListStatus } from 'src/types/purchase'
import type { SuccessResponse } from 'src/types/utils'

interface ProductBody {
  product_id: string
  buy_count: number
}

const purchaseApi = {
  addToCart(body: ProductBody) {
    return http.post<SuccessResponse<Purchase>>(`${UrlPaths.URL_PURCHASES}${UrlPaths.URL_ADD_TO_CART}`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(UrlPaths.URL_PURCHASES, {
      params
    })
  },

  buyProducts(body: ProductBody[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${UrlPaths.URL_PURCHASES}${UrlPaths.URL_BUY_PRODUCTS}`, body)
  },

  updatePurchase(body: ProductBody) {
    return http.put<SuccessResponse<Purchase>>(`${UrlPaths.URL_PURCHASES}${UrlPaths.URL_UPDATE_PURCHASE}`, body)
  },

  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(UrlPaths.URL_PURCHASES, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
