import React from 'react'
import type { User } from 'src/types/user'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils'

interface AppContextInterface {
  isAuthenticated: boolean
  profile: User | null
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS(),
  setIsAuthenticated: () => null,
  setProfile: () => null
}

export const AppContext = React.createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = React.useState<User | null>(initialAppContext.profile)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
