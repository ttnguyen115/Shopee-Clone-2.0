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

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGEwNjg3MmI3NWZmMjU0ODY1MjVhMiIsImVtYWlsIjoidGhhbmh0cnVuZzEwMTIwMDBAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0yMVQwNTowODozMy42MDVaIiwiaWF0IjoxNjcxNTk5MzEzLCJleHAiOjE2NzIyMDQxMTN9.A5dXsVbktEefFAaiEf9ALtxMr3zNPMPRGDqS9aoYp4c'

const refresh_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGEwNjg3MmI3NWZmMjU0ODY1MjVhMiIsImVtYWlsIjoidGhhbmh0cnVuZzEwMTIwMDBAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0yMVQwNTowODozMy42MDVaIiwiaWF0IjoxNjcxNTk5MzEzLCJleHAiOjE2ODAyMzkzMTN9.GJdll48XyxwuS7ANF8KLd0_SljQd1L3r8sel5gcWqzw'

const profile =
  '{"_id":"638a06872b75ff25486525a2","roles":["User"],"email":"thanhtrung1012000@gmail.com","createdAt":"2022-12-02T14:07:03.484Z","updatedAt":"2022-12-20T15:35:31.933Z","__v":0,"address":"17 TX25, P. 13, Q.12, TP.HCM","avatar":"a5612cd0-e5c3-4e57-8d0c-72fddac6aac1.jpg","date_of_birth":"1998-07-02T17:00:00.000Z","name":"Nguyen Thanh Trung","phone":"0123123123"}'

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
