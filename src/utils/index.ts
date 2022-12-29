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
  isAxiosExpiredTokenError,
  isAxiosUnauthorizedError,
  isAxiosUnprocessableEntityError,
  saleRate
} from './utils'
import { delay, logScreen, renderWithRouter } from './testUtils'

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
  isAxiosExpiredTokenError,
  delay,
  logScreen,
  renderWithRouter
}
// export variables
export { schema }
// export types
export type { Schema }
