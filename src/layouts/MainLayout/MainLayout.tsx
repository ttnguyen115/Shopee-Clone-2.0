import AppFooter from 'src/components/AppFooter'
import AppHeader from 'src/components/AppHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <AppHeader />
      MainLayout
      <AppFooter />
    </div>
  )
}
