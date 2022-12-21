import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import sumBy from 'lodash/sumBy'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import emptyCartPng from 'src/assets/img/empty-cart.png'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'

import { AppRoutes, PurchasesStatus } from 'src/constants'
import { AppContext } from 'src/contexts/app'
import { purchaseApi } from 'src/services/apis'
import { currencyFormatter, generateNameId } from 'src/utils'

import type { Purchase } from 'src/types/purchase'

export default function Cart() {
  const { state } = useLocation()
  const chosenPurchaseIdFromLocation = (state as { purchaseId: string } | null)?.purchaseId
  const { extendedPurchases, setExtendedPurchases } = React.useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.IN_CART }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.IN_CART })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => refetch()
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => refetch()
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = React.useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = React.useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases]
  )
  const totalCheckedPurchasePrice = React.useMemo(
    () => sumBy(checkedPurchases, (purchase) => purchase.buy_count * purchase.price),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = React.useMemo(
    () => sumBy(checkedPurchases, (purchase) => purchase.buy_count * (purchase.price_before_discount - purchase.price)),
    [checkedPurchases]
  )

  React.useEffect(() => {
    setExtendedPurchases((prev) => {
      // => ['_id']: { _id: ..., name: ...,... }
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChosenPurchaseFromLocation = chosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChosenPurchaseFromLocation || Boolean(extendedPurchaseObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, chosenPurchaseIdFromLocation, setExtendedPurchases])

  React.useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheckPurchase = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleChangeQuantity = (purchaseIndex: number, value: number, validQuantity: boolean) => {
    if (!validQuantity) return
    const { product } = extendedPurchases[purchaseIndex]
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].disabled = true
      })
    )
    updatePurchaseMutation.mutate({ product_id: product._id, buy_count: value })
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteCheckedItems = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyProducts = () => {
    if (checkedPurchases.length === 0) return
    const body = checkedPurchases.map(({ product, buy_count }) => ({
      product_id: product._id,
      buy_count: buy_count
    }))
    buyProductsMutation.mutate(body)
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <React.Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases.map(({ product, _id, buy_count, checked, disabled }, index) => (
                      <div
                        key={_id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                checked={checked}
                                onChange={handleCheckPurchase(index)}
                                className='h-5 w-5 accent-orange'
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0'
                                  to={`${AppRoutes.APP_DEFAULT}${generateNameId({
                                    name: product.name,
                                    _id: product._id
                                  })}`}
                                >
                                  <img src={product.image} alt={product.name} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    to={`${AppRoutes.APP_DEFAULT}${generateNameId({
                                      name: product.name,
                                      _id: product._id
                                    })}`}
                                    className='text-left line-clamp-2'
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫ {currencyFormatter(product.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫ {currencyFormatter(product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={product.quantity}
                                value={buy_count}
                                classNameWrapper='flex items-center'
                                disabled={disabled}
                                onIncrease={(value) => handleChangeQuantity(index, value, value <= product.quantity)}
                                onDecrease={(value) => handleChangeQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleChangeQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>₫ {currencyFormatter(product.price * buy_count)}</span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-orange'
                                onClick={handleDelete(index)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteCheckedItems}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({checkedPurchases.length} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫ {currencyFormatter(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫ {currencyFormatter(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyProducts}
                  disabled={buyProductsMutation.isLoading}
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className='text-center'>
            <img src={emptyCartPng} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={AppRoutes.APP_HOMEPAGE}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
