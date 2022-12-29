import React from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

import App from 'src/App'
import { render, screen, waitFor, waitForOptions } from '@testing-library/react'
import { expect } from 'vitest'

// import { AppProvider } from 'src/contexts/app'

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body, 99999999)
}

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return {
    user: userEvent.setup(),
    ...render(<App />, { wrapper: BrowserRouter })
  }
}

// const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false
//       },
//       mutations: {
//         retry: false
//       }
//     },
//     logger: {
//       log: console.log,
//       warn: console.warn,
//       // no more errors on the console
//       error: () => null
//     }
//   })
//
//   // eslint-disable-next-line react/display-name
//   return ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   )
// }
//
// export const renderWithRouter = ({ route = '/' } = {}) => {
//   const Provider = createWrapper()
//   window.history.pushState({}, 'Test page', route)
//   const defaultValueAppContext = getInitialAppContext()
//   return {
//     user: userEvent.setup(),
//     ...render(
//       <Provider>
//         <AppProvider defaultValue={defaultValueAppContext}>
//           <App />
//         </AppProvider>
//       </Provider>,
//       { wrapper: BrowserRouter }
//     )
//   }
// }
