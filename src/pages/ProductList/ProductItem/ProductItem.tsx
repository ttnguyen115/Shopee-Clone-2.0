import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/constants'

import { ReactComponent as StarFilledGraySvg } from 'src/assets/star-filled-gray.svg'
import { ReactComponent as StarFilledSvg } from 'src/assets/star-filled.svg'
import type { Product as ProductType } from 'src/types/product'
import { currencyFormatter, formatNumberToSocialStyle } from 'src/utils'

interface Props {
  product: ProductType
}

export default function ProductItem({ product }: Props) {
  const { image, description, price, price_before_discount, rating, sold, name } = product

  return (
    <Link to={AppRoutes.APP_DEFAULT}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={image} alt={name} className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{description || name}</div>
          <div className='mt-3'>
            <div className='max-w-[50%] text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='ml-1'>{currencyFormatter(price_before_discount)}</span>
            </div>
            <div className='ml-1 text-orange'>
              <span className='text-xs'>đ</span>
              <span className='ml-1'>{currencyFormatter(price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <StarFilledSvg className='h-3 w-3 fill-yellow-300 text-yellow-300' />
                </div>
                <StarFilledGraySvg className='h-3 w-3 fill-current text-gray-300' />
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
