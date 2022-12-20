import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'

import { CartLayout, MainLayout, RegisterLayout, UserLayout } from 'src/layouts'
import { Cart, Login, NotFound, ProductDetail, ProductList, Register } from 'src/pages'
import { ChangePassword, HistoryPurchase, Profile } from 'src/pages/User/pages'

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
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: AppRoutes.APP_PRODUCT_DETAIL,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
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
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: AppRoutes.APP_PROFILE,
              element: <Profile />
            },
            {
              path: AppRoutes.APP_CHANGE_PASSWORD,
              element: <ChangePassword />
            },
            {
              path: AppRoutes.APP_HISTORY_PURCHASE,
              element: <HistoryPurchase />
            }
          ]
        },
        {
          path: AppRoutes.APP_CART,
          element: (
            <CartLayout>
              <Cart />
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: AppRoutes.APP_REGISTER,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
