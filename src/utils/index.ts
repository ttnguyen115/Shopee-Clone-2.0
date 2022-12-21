import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { schema, Schema } from './rules'
import {
  currencyFormatter,
  formatNumberToSocialStyle,
  generateNameId,
  getAvatarUrl,
  getIdFromNameId,
  isAxiosError,
  isAxiosUnprocessableEntityError,
  saleRate,
  isAxiosUnauthorizedError,
  isAxiosExpiredTokenError
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
  getAvatarUrl,
  setRefreshTokenToLS,
  getRefreshTokenFromLS,
  isAxiosUnauthorizedError,
  isAxiosExpiredTokenError
}
// export variables
export { schema }
// export types
export type { Schema }
