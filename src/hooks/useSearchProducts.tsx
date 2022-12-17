import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { AppRoutes } from 'src/constants'
import { useQueryConfig } from 'src/hooks'
import { schema, Schema } from 'src/utils'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

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

  return { onSubmitSearch, register }
}
