import type { User } from 'src/types/user'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = (): string => localStorage.getItem('access_token') || ''

export const getProfileFromLS = (): User | null => {
  const profileValue = localStorage.getItem('profile')
  return profileValue ? JSON.parse(profileValue) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
