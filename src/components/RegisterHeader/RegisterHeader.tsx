import { Link, useMatch } from 'react-router-dom'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import { AppRoutes } from 'src/constants'

export default function RegisterHeader() {
  const registerMatch = useMatch(AppRoutes.APP_REGISTER)
  const isRegister = Boolean(registerMatch)

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={AppRoutes.APP_HOMEPAGE}>
            <ShopeeLogoSvg />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
