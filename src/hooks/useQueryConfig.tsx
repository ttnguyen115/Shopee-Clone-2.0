import _ from 'lodash'
import useQueryParams from 'src/hooks/useQueryParams'
import type { ProductListConfig } from 'src/types/product'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig(): QueryConfig {
  const queryParams: QueryConfig = useQueryParams()
  const {
    page = '1',
    limit = '20',
    sort_by,
    exclude,
    name,
    order,
    price_max,
    price_min,
    rating_filter,
    category
  } = queryParams
  const queryConfig: QueryConfig = _.omitBy(
    {
      page,
      limit,
      sort_by,
      exclude,
      name,
      order,
      price_max,
      price_min,
      rating_filter,
      category
    },
    _.isUndefined
  )

  return queryConfig
}
