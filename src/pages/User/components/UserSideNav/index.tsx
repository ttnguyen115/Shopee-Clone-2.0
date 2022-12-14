import clsx from 'clsx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'
import { getAvatarUrl } from 'src/utils'

export default function UserSideNav() {
  const { profile } = React.useContext(AppContext)

  return (
    <React.Fragment>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={AppRoutes.APP_PROFILE}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name || profile?.email}</div>
          <Link to={AppRoutes.APP_PROFILE} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={AppRoutes.APP_PROFILE}
          className={({ isActive }) =>
            clsx('mt-4 flex items-center capitalize transition-colors', isActive ? 'text-orange' : 'text-gray-600')
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={AppRoutes.APP_CHANGE_PASSWORD}
          className={({ isActive }) =>
            clsx('mt-4 flex items-center capitalize transition-colors', isActive ? 'text-orange' : 'text-gray-600')
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={AppRoutes.APP_HISTORY_PURCHASE}
          className={({ isActive }) =>
            clsx('mt-4 flex items-center capitalize transition-colors', isActive ? 'text-orange' : 'text-gray-600')
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </React.Fragment>
  )
}
