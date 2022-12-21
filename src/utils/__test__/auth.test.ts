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

const access_token = 'Bearer access_token'

const refresh_token = 'Bearer refresh_token'

const profile =
  '{"_id":"123","roles":["User"],"email":"t0@gmail.com","createdAt":"2000-12-02T14:07:03.484Z","updatedAt":"2000-12-20T15:35:31.933Z","__v":0,"address":"Vietnam","avatar":"abc.jpg","date_of_birth":"1900-07-02T17:00:00.000Z","name":"Jett Nguyen","phone":"0123123123"}'

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
