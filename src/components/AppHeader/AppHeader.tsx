import { Link } from 'react-router-dom'

import { ReactComponent as CartSvg } from 'src/assets/cart.svg'
import { ReactComponent as ChevronDownSvg } from 'src/assets/chevron-down.svg'
import { ReactComponent as GlobalSvg } from 'src/assets/global.svg'
import { ReactComponent as SearchSvg } from 'src/assets/search.svg'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import { ReactComponent as UserCircleSvg } from 'src/assets/user-circle.svg'

export default function AppHeader() {
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <div className='flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <GlobalSvg />
            <span className='mx-1'>Tiếng Việt</span>
            <ChevronDownSvg />
          </div>
          <div className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <UserCircleSvg />
            </div>
            <div>ttnguyen115</div>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2'>
            <ShopeeLogoSvg className='h-11 fill-white' />
          </Link>
          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                placeholder='Tìm kiếm sản phẩm'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                <SearchSvg />
              </button>
            </div>
          </form>
          <div className='col-span-1'>
            <Link to='/'>
              <CartSvg />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
