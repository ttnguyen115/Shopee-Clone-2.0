import React from 'react'
import type { ExtendedPurchases } from 'src/types/purchase'
import type { User } from 'src/types/user'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  profile: User | null
  extendedPurchases: ExtendedPurchases[]
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS(),
  extendedPurchases: [],
  setIsAuthenticated: () => null,
  setProfile: () => null,
  setExtendedPurchases: () => null,
  reset: () => null
}

export const AppContext = React.createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = React.useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = React.useState<ExtendedPurchases[]>(
    initialAppContext.extendedPurchases
  )

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        profile,
        extendedPurchases,
        setIsAuthenticated,
        setProfile,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
