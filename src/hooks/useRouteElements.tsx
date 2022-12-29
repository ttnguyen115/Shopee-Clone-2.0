import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'

import { CartLayout, MainLayout, RegisterLayout, UserLayout } from 'src/layouts'

const Login = React.lazy(() => import('src/pages/Login'))
const Register = React.lazy(() => import('src/pages/Register'))
const Cart = React.lazy(() => import('src/pages/Cart'))
const ProductDetail = React.lazy(() => import('src/pages/ProductDetail'))
const ProductList = React.lazy(() => import('src/pages/ProductList'))
const NotFound = React.lazy(() => import('src/pages/NotFound'))

const ChangePassword = React.lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = React.lazy(() => import('src/pages/User/pages/HistoryPurchase'))
const Profile = React.lazy(() => import('src/pages/User/pages/Profile'))

function ProtectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={AppRoutes.APP_LOGIN} />
}

function RejectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={AppRoutes.APP_DEFAULT} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: AppRoutes.APP_HOMEPAGE,
      index: true,
      element: (
        <MainLayout>
          <React.Suspense>
            <ProductList />
          </React.Suspense>
        </MainLayout>
      )
    },
    {
      path: AppRoutes.APP_PRODUCT_DETAIL,
      index: true,
      element: (
        <MainLayout>
          <React.Suspense>
            <ProductDetail />
          </React.Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: AppRoutes.APP_USER,
          element: (
            <MainLayout>
              <React.Suspense>
                <UserLayout />
              </React.Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: AppRoutes.APP_PROFILE,
              element: (
                <React.Suspense>
                  <Profile />
                </React.Suspense>
              )
            },
            {
              path: AppRoutes.APP_CHANGE_PASSWORD,
              element: (
                <React.Suspense>
                  <ChangePassword />
                </React.Suspense>
              )
            },
            {
              path: AppRoutes.APP_HISTORY_PURCHASE,
              element: (
                <React.Suspense>
                  <HistoryPurchase />
                </React.Suspense>
              )
            }
          ]
        },
        {
          path: AppRoutes.APP_CART,
          element: (
            <CartLayout>
              <React.Suspense>
                <Cart />
              </React.Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: AppRoutes.APP_LOGIN,
          element: (
            <RegisterLayout>
              <React.Suspense>
                <Login />
              </React.Suspense>
            </RegisterLayout>
          )
        },
        {
          path: AppRoutes.APP_REGISTER,
          element: (
            <RegisterLayout>
              <React.Suspense>
                <Register />
              </React.Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <React.Suspense>
            <NotFound />
          </React.Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
