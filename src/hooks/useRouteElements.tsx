import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'

import { MainLayout, RegisterLayout } from 'src/layouts'
import { Login, ProductList, Profile, Register } from 'src/pages'

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
