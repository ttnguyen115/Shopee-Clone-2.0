import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'

import { CartLayout, MainLayout, RegisterLayout } from 'src/layouts'
import { Cart, Login, ProductDetail, ProductList, Profile, Register } from 'src/pages'

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
          path: AppRoutes.APP_PROFILE,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
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
    }
  ])

  return routeElements
}
