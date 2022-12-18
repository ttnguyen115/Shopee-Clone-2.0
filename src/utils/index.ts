import { clearLocalStorage, getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileFromLS } from './auth'
import { schema, Schema } from './rules'
import {
  currencyFormatter,
  formatNumberToSocialStyle,
  generateNameId,
  getIdFromNameId,
  isAxiosError,
  isAxiosUnprocessableEntityError,
  saleRate
} from './utils'

// export functions
export {
  isAxiosUnprocessableEntityError,
  isAxiosError,
  setAccessTokenToLS,
  clearLocalStorage,
  getAccessTokenFromLS,
  getProfileFromLS,
  setProfileFromLS,
  formatNumberToSocialStyle,
  currencyFormatter,
  saleRate,
  generateNameId,
  getIdFromNameId
}
// export variables
export { schema }
// export types
export type { Schema }
