import type { Product } from 'src/types/product'

export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseListStatus = PurchasesStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchasesStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
