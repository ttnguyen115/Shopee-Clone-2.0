import { useQuery } from '@tanstack/react-query'

import Pagination from 'src/components/Pagination'
import AsideFilter from 'src/pages/ProductList/components/AsideFilter'
import ProductItem from 'src/pages/ProductList/components/ProductItem'
import SortProductList from 'src/pages/ProductList/components/SortProductList'

import { queryTime } from 'src/constants'
import { useQueryConfig } from 'src/hooks'
import type { QueryConfig } from 'src/hooks/useQueryConfig'
import { categoryApi, productApi } from 'src/services/apis'
import type { ProductListConfig } from 'src/types/product'

export default function ProductList() {
  const queryConfig: QueryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: queryTime.PRODUCT_STALE_TIME
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
