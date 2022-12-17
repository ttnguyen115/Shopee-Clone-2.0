import { Link } from 'react-router-dom'

import { ReactComponent as SearchSvg } from 'src/assets/search.svg'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import NavHeader from 'src/components/NavHeader'

import { AppRoutes } from 'src/constants'
import { useSearchProducts } from 'src/hooks'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={AppRoutes.APP_HOMEPAGE} className='flex flex-shrink-0 items-end'>
              <div>
                <ShopeeLogoSvg />
              </div>
              <div className='mx-4 h-6 w-[1px] bg-orange md:h-8' />
              <div className='capitalize text-orange md:text-xl'>Giỏ hàng</div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='flex rounded-sm border-2 border-orange'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free Ship Đơn Từ 0Đ'
                  {...register('name')}
                />
                <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-8 hover:opacity-90'>
                  <SearchSvg className='h-5 w-5 stroke-white' />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
