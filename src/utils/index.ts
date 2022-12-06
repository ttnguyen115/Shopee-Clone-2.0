import { clearLocalStorage, getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileFromLS } from './auth'
import { getRules, schema, Schema } from './rules'
import {
  currencyFormatter,
  formatNumberToSocialStyle,
  isAxiosError,
  isAxiosUnprocessableEntityError,
  saleRate
} from './utils'

// export functions
export {
  getRules,
  isAxiosUnprocessableEntityError,
  isAxiosError,
  setAccessTokenToLS,
  clearLocalStorage,
  getAccessTokenFromLS,
  getProfileFromLS,
  setProfileFromLS,
  formatNumberToSocialStyle,
  currencyFormatter,
  saleRate
}
// export variables
export { schema }
// export types
export type { Schema }
