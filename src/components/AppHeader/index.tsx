import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { ReactComponent as CartSvg } from 'src/assets/cart.svg'
import { ReactComponent as ChevronDownSvg } from 'src/assets/chevron-down.svg'
import { ReactComponent as GlobalSvg } from 'src/assets/global.svg'
import { ReactComponent as SearchSvg } from 'src/assets/search.svg'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import { ReactComponent as UserCircleSvg } from 'src/assets/user-circle.svg'
import Popover from '../Popover'

import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'
import { useQueryConfig } from 'src/hooks'
import { authApi } from 'src/services/apis'
import { schema, Schema } from 'src/utils'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function AppHeader() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = React.useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })
  const handleLogout = () => logoutMutation.mutate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? _.omit(
          {
            ...queryConfig,
            name: data.name
          },
          // omit filters based on for each business requirements
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
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
                <UserCircleSvg />
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

        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to={AppRoutes.APP_HOMEPAGE} className='col-span-2'>
            <ShopeeLogoSvg className='h-11 w-full fill-white' />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                <SearchSvg />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img src='https://picsum.photos/200' alt='product' className='h11 w-11 object-cover' />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio nesciunt id, alias
                            repellendus recusandae expedita. Nam sequi expedita voluptate iste adipisci facere ullam
                            laborum quos consectetur dolores. Distinctio, architecto!
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <div className='text-orange'>đ460.000</div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img src='https://picsum.photos/200' alt='product' className='h11 w-11 object-cover' />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio nesciunt id, alias
                            repellendus recusandae expedita. Nam sequi expedita voluptate iste adipisci facere ullam
                            laborum quos consectetur dolores. Distinctio, architecto!
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <div className='text-orange'>đ460.000</div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img src='https://picsum.photos/200' alt='product' className='h11 w-11 object-cover' />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio nesciunt id, alias
                            repellendus recusandae expedita. Nam sequi expedita voluptate iste adipisci facere ullam
                            laborum quos consectetur dolores. Distinctio, architecto!
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <div className='text-orange'>đ460.000</div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img src='https://picsum.photos/200' alt='product' className='h11 w-11 object-cover' />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio nesciunt id, alias
                            repellendus recusandae expedita. Nam sequi expedita voluptate iste adipisci facere ullam
                            laborum quos consectetur dolores. Distinctio, architecto!
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <div className='text-orange'>đ460.000</div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img src='https://picsum.photos/200' alt='product' className='h11 w-11 object-cover' />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum odio nesciunt id, alias
                            repellendus recusandae expedita. Nam sequi expedita voluptate iste adipisci facere ullam
                            laborum quos consectetur dolores. Distinctio, architecto!
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <div className='text-orange'>đ460.000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-500'>Thêm hàng vào giỏ</div>
                      <button className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to={AppRoutes.APP_DEFAULT}>
                <CartSvg />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
