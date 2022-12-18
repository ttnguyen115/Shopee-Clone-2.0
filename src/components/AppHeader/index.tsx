import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as CartSvg } from 'src/assets/cart.svg'
import emptyCartPng from 'src/assets/img/empty-cart.png'
import { ReactComponent as SearchSvg } from 'src/assets/search.svg'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import NavHeader from 'src/components/NavHeader'
import Popover from 'src/components/Popover'

import { AppRoutes, PurchasesStatus } from 'src/constants'
import { AppContext } from 'src/contexts/app'
import { useSearchProducts } from 'src/hooks'
import { purchaseApi } from 'src/services/apis'
import { currencyFormatter } from 'src/utils'

const MAX_SHOWING_PURCHASES_IN_CART = 5

export default function AppHeader() {
  const { isAuthenticated } = React.useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProducts()

  // when routing pages, AppHeader is only re-rendered
  // Not unmount and mount again
  // Exception: logout => RegisterLayout
  // query is not inactive => not be called => not need to set stale: Infinity
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.IN_CART }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.IN_CART }),
    enabled: isAuthenticated
  })
  const purchaseInCart = purchaseInCartData?.data.data

  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <NavHeader />

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
                  {purchaseInCart && purchaseInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchaseInCart
                          .slice(0, MAX_SHOWING_PURCHASES_IN_CART)
                          .map(({ product: { _id, name, image, price } }) => (
                            <div className='mt-2 flex py-2 hover:bg-gray-100' key={_id}>
                              <div className='flex-shrink-0'>
                                <img src={image} alt={name} className='h11 w-11 object-cover' />
                              </div>
                              <div className='ml-2 flex-grow overflow-hidden'>
                                <div className='truncate'>{name}</div>
                                <div className='ml-2 flex-shrink-0'>
                                  <div className='text-orange'>đ {currencyFormatter(price)}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchaseInCart.length > MAX_SHOWING_PURCHASES_IN_CART
                            ? purchaseInCart.length - MAX_SHOWING_PURCHASES_IN_CART
                            : ''}{' '}
                          Thêm hàng vào giỏ
                        </div>
                        <Link
                          to={AppRoutes.APP_CART}
                          className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img src={emptyCartPng} alt='empty cart' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={AppRoutes.APP_CART} className='relative'>
                <CartSvg />
                {purchaseInCart && purchaseInCart.length > 0 && (
                  <span className='absolute top-[-5px] right-[-10px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange'>
                    {purchaseInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
