import clsx from 'clsx'
import _ from 'lodash'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ChevronLeftSvg } from 'src/assets/chevron-left.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right.svg'

import type { ProductListConfig } from 'src/types/product'
import { QueryConfig } from '../ProductList'

import { AppRoutes } from 'src/constants'
import { order as orderConstants, sortBy } from 'src/constants/product'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order, page } = queryConfig
  const pageCurrent = Number(page)
  const navigate = useNavigate()
  const classNameFromSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>): string => {
    return sort_by === sortByValue
      ? 'bg-orange text-white hover:bg-orange/80'
      : 'bg-white text-black hover:bg-slate-100'
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams(
        _.omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as Exclude<ProductListConfig['order'], undefined>
    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={clsx('h-8 px-4 text-center text-sm capitalize', classNameFromSortBy(sortBy.view))}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={clsx('h-8 px-4 text-center text-sm capitalize', classNameFromSortBy(sortBy.createdAt))}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={clsx('h-8 px-4 text-center text-sm capitalize', classNameFromSortBy(sortBy.sold))}
          >
            Bán chạy
          </button>
          <select
            className={clsx('h-8 px-4 text-center text-sm capitalize outline-none', classNameFromSortBy(sortBy.price))}
            value={order || ''}
            onChange={handlePriceOrder}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstants.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstants.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{pageCurrent}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {pageCurrent === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'>
                <ChevronLeftSvg />
              </span>
            ) : (
              <Link
                to={{
                  pathname: AppRoutes.APP_DEFAULT,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (pageCurrent - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'
              >
                <ChevronLeftSvg />
              </Link>
            )}
            {pageCurrent === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'>
                <ChevronRightSvg />
              </span>
            ) : (
              <Link
                to={{
                  pathname: AppRoutes.APP_DEFAULT,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (pageCurrent + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'
              >
                <ChevronRightSvg />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
