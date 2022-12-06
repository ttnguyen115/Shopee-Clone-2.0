import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { ReactComponent as AsideFilterSvg } from 'src/assets/aside-filter.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right-filled.svg'
import { ReactComponent as SearchFilterSvg } from 'src/assets/search-filter.svg'

import Button from 'src/components/Button'
import NumberInputField from 'src/components/NumberInputField'
import RatingStars from 'src/pages/ProductList/components/RatingStars'

import _ from 'lodash'
import { AppRoutes } from 'src/constants'
import { QueryConfig } from 'src/pages/ProductList'
import type { Category } from 'src/types/category'
import type { NoUndefinedField } from 'src/types/utils'
import { Schema, schema } from 'src/utils'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const onSubmit = handleSubmit(({ price_max, price_min }) =>
    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams({
        ...queryConfig,
        price_min,
        price_max
      }).toString()
    })
  )

  const handleRemoveAllFilters = () =>
    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams(
        _.omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])
      ).toString()
    })

  return (
    <div className='py-4'>
      <Link to={AppRoutes.APP_DEFAULT} className={clsx('flex items-center font-bold', !category && 'text-orange')}>
        <AsideFilterSvg />
        <span className='ml-2'>Tất cả danh mục</span>
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const isActiveCategory = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: AppRoutes.APP_DEFAULT,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={clsx('relative px-2', isActiveCategory && 'font-semibold text-orange')}
              >
                {isActiveCategory && <ChevronRightSvg className='absolute top-1 left-[-10px] h-2 w-2 fill-orange' />}{' '}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={AppRoutes.APP_DEFAULT} className='mt-4 flex items-center font-bold uppercase'>
        <SearchFilterSvg x={0} y={0} stroke='currentColor' />
        <span className='ml-2'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <NumberInputField
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm rounded-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <NumberInputField
                    type='text'
                    className='grow'
                    placeholder='đ ĐẾN'
                    classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm rounded-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>
            {errors.price_max?.message || errors.price_min?.message}
          </div>
          <Button className='mt-3 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAllFilters}
        className='mt-3 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xoá tất cả
      </Button>
    </div>
  )
}
