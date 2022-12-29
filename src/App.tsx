import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ErrorBoundary from './components/ErrorBoundary'

import { AppContext, AppProvider } from 'src/contexts/app'
import { useRouteElements } from 'src/hooks'
import { LocalStorageEventTarget } from 'src/utils/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {
  const routeElements = useRouteElements()
  const { reset } = React.useContext(AppContext)

  React.useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
