import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from 'src/contexts/app'
import { useRouteElements } from 'src/hooks'
import { LocalStorageEventTarget } from 'src/utils/auth'

function App() {
  const routeElements = useRouteElements()
  const { reset } = React.useContext(AppContext)

  React.useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
