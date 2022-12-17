import React from 'react'
import AppFooter from 'src/components/AppFooter'
import CartHeader from 'src/components/CartHeader'

interface Props {
  children: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <AppFooter />
    </div>
  )
}
