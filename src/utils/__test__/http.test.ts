import { beforeEach, describe, expect, it } from 'vitest'

import { Http } from 'src/services/http'

import { HttpStatusCode } from 'src/constants'
import { UrlPaths } from 'src/services/apis'

describe('http axios', () => {
  let http = new Http().instance

  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  it('get Products', async () => {
    // Should not use or import 'apis' or 'services' folders, can cause errors if having any changes
    const res = await http.get(UrlPaths.URL_PRODUCTS)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth request', async () => {
    // Should have 1 test account or using test server
    await http.post(UrlPaths.URL_LOGIN, {
      email: 'thanhtrung1012000@gmail.com',
      password: '123123'
    })
    const res = await http.get(UrlPaths.URL_PROFILE)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh token', async () => {
    // Change expire-access-token to 1 second to test or using Postman
    await http.post(UrlPaths.URL_LOGIN, {
      // test done -> change to mock account
      email: 'email@gmail.com',
      password: 'test123'
    })
    const res = await http.get(UrlPaths.URL_PROFILE)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
