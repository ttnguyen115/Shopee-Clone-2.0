import { Link } from 'react-router-dom'

import { ReactComponent as AsideFilterSvg } from 'src/assets/aside-filter.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right-filled.svg'
import { ReactComponent as SearchFilterSvg } from 'src/assets/search-filter.svg'
import { ReactComponent as StarFilledSvg } from 'src/assets/star-filled.svg'

import Button from 'src/components/Button'
import InputField from 'src/components/InputField'

import { AppRoutes } from 'src/constants'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={AppRoutes.APP_DEFAULT} className='flex items-center font-bold'>
        <AsideFilterSvg />
        <span className='ml-2'>Tất cả danh mục</span>
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        <li className='py-2 pl-2'>
          <Link to={AppRoutes.APP_DEFAULT} className='relative px-2 font-semibold text-orange'>
            <ChevronRightSvg className='absolute top-1 left-[-10px] h-2 w-2 fill-orange' /> Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={AppRoutes.APP_DEFAULT} className='relative px-2'>
            Thời trang nam
          </Link>
        </li>
      </ul>
      <Link to={AppRoutes.APP_DEFAULT} className='mt-4 flex items-center font-bold uppercase'>
        <SearchFilterSvg x={0} y={0} stroke='currentColor' />
        <span className='ml-2'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <InputField
              type='text'
              className='grow'
              name='priceFrom'
              placeholder='đ TỪ'
              classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm rounded-sm'
              classNameError=''
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <InputField
              type='text'
              className='grow'
              name='priceFrom'
              placeholder='đ ĐẾN'
              classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm rounded-sm'
              classNameError=''
            />
          </div>
          <Button className='mt-3 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='pl2 py-1'>
          <Link to={AppRoutes.APP_DEFAULT} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarFilledSvg key={index} className='mr-1 h-4 w-4' />
              ))}
            trở lên
          </Link>
        </li>
        <li className='pl2 py-1'>
          <Link to={AppRoutes.APP_DEFAULT} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarFilledSvg key={index} className='mr-1 h-4 w-4' />
              ))}
            trở lên
          </Link>
        </li>
      </ul>
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button className='mt-3 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
        Xoá tất cả
      </Button>
    </div>
  )
}
