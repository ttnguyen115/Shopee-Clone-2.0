import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AppRoutes } from './constants'
import { renderWithRouter } from './utils'

expect.extend(matchers)

describe('App', () => {
  test('App renders and routing', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })

  test('App renders NotFound', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
  })

  test('App renders Register page by directly typing', async () => {
    renderWithRouter({ route: AppRoutes.APP_REGISTER })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
