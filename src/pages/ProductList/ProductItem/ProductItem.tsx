import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/constants'

import { ReactComponent as StarFilledGraySvg } from 'src/assets/star-filled-gray.svg'
import { ReactComponent as StarFilledSvg } from 'src/assets/star-filled.svg'

export default function ProductItem() {
  return (
    <Link to={AppRoutes.APP_DEFAULT}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://picsum.photos/200/300'
            alt='product'
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, officiis. Rem quidem facilis natus
            nostrum asperiores velit veritatis maiores adipisci suscipit, dolores earum vel tenetur odit atque dolorem
            possimus fugiat!
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>đ 12.000</div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span className='ml-1'>2.000</span>
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
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
