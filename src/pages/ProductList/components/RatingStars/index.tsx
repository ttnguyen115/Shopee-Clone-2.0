import { createSearchParams, useNavigate } from 'react-router-dom'

import { ReactComponent as StarFilledSvg } from 'src/assets/star-filled.svg'
import { ReactComponent as StarOutlinedSvg } from 'src/assets/star-outlined.svg'

import { AppRoutes } from 'src/constants'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleFilterStar = (rating_filter: string): void =>
    navigate({
      pathname: AppRoutes.APP_DEFAULT,
      search: createSearchParams({
        ...queryConfig,
        rating_filter
      }).toString()
    })

  return (
    <div>
      <ul className='my-3'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <li key={index} className='pl2 py-1'>
              <div
                tabIndex={0}
                role='button'
                aria-hidden='true'
                onClick={() => handleFilterStar(String(5 - index))}
                className='flex cursor-pointer items-center text-sm'
              >
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index) {
                      return <StarFilledSvg key={indexStar} className='mr-1 h-4 w-4' />
                    }
                    return <StarOutlinedSvg key={indexStar} className='mr-1 h-4 w-4' />
                  })}
                {index !== 0 && <span className='ml-2'>trở lên</span>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
