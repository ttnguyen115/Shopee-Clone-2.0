const AppRoutes = {
  APP_DEFAULT: '/',
  APP_HOMEPAGE: '/',
  APP_LOGIN: '/login',
  APP_REGISTER: '/register',
  APP_CART: '/cart',
  APP_PRODUCT_DETAIL: ':nameId',

  APP_USER: '/user',
  APP_PROFILE: '/user/profile',
  APP_CHANGE_PASSWORD: '/user/password',
  APP_HISTORY_PURCHASE: '/user/purchase'
} as const

export default AppRoutes
