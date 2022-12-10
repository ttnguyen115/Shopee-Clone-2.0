const enum PurchasesStatus {
  IN_CART = -1,
  ALL = 0,
  WAIT_FOR_CONFIRMATION = 1,
  WAIT_FOR_DRIVER_CONFIRMATION = 2,
  WAIT_FOR_DELIVERY = 3,
  DELIVERED = 4,
  CANCELED = 5
}

export default PurchasesStatus
