import { getProfileFromLS } from 'src/utils'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const access_token = 'access_token'

const refresh_token = 'refresh_token'

const profile = '{}'

beforeEach(() => {
  localStorage.clear()
})

describe('setAccessTokenToLS and getAccessTokenFromLS', () => {
  it('access_token set and get from local storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('setRefreshTokenToLS and getRefreshTokenFromLS', () => {
  it('refresh_token set and get from local storage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('setProfileToLS and getProfileFromLS', () => {
  it('profile set and get from local storage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(getProfileFromLS()).toStrictEqual(JSON.parse(profile))
  })
})

describe('clearLocalStorage', () => {
  it('clear access_token, refresh_token, profile from local storage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLocalStorage()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
  })
})
