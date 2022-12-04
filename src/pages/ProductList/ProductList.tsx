import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Pagination from 'src/components/Pagination'

import { useQueryParams } from 'src/hooks'
import { productApi } from 'src/services/apis'

import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [page, setPage] = React.useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <ProductItem product={product} />
                  </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
