import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ChevronDownSvg } from 'src/assets/chevron-down.svg'
import { ReactComponent as GlobalSvg } from 'src/assets/global.svg'
import { ReactComponent as UserCircleSvg } from 'src/assets/user-circle.svg'
import Popover from 'src/components/Popover'

import { AppRoutes, PurchasesStatus } from 'src/constants'

import { AppContext } from 'src/contexts/app'
import { authApi } from 'src/services/apis'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = React.useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: PurchasesStatus.IN_CART }] })
    }
  })
  const handleLogout = () => logoutMutation.mutate()

  return (
    <div className='flex justify-end'>
      <Popover
        as='span'
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 px-3'>
              <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
              <button className='py-2 px-3 hover:text-orange'>English</button>
            </div>
          </div>
        }
      >
        <GlobalSvg />
        <span className='mx-1'>Tiếng Việt</span>
        <ChevronDownSvg />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={AppRoutes.APP_PROFILE}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={AppRoutes.APP_DEFAULT}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            {profile?.avatar ? (
              <img src={profile.avatar} alt='avatar' className='h-full w-full rounded-full object-cover' />
            ) : (
              <UserCircleSvg />
            )}
          </div>
          <div>{profile?.name || profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={AppRoutes.APP_REGISTER} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={AppRoutes.APP_LOGIN} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
