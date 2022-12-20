import { clearLocalStorage, getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { schema, Schema } from './rules'
import {
  currencyFormatter,
  formatNumberToSocialStyle,
  generateNameId,
  getAvatarUrl,
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
  setProfileToLS,
  formatNumberToSocialStyle,
  currencyFormatter,
  saleRate,
  generateNameId,
  getIdFromNameId,
  getAvatarUrl
}
// export variables
export { schema }
// export types
export type { Schema }
