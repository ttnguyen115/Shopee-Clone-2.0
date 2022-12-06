import { ReactComponent as StarFilledGraySvg } from 'src/assets/star-filled-gray.svg'
import { ReactComponent as StarFilledSvg } from 'src/assets/star-filled.svg'

interface Props {
  rating: number
  activeClassName?: string
  nonActiveClassName?: string
}

export default function ProductRating({
  rating,
  activeClassName = 'h-3 w-3 fill-yellow-300 text-yellow-300',
  nonActiveClassName = 'h-3 w-3 fill-current text-gray-300'
}: Props) {
  const handleWidth = (order: number): string => {
    if (order <= rating) {
      return '100%'
    }
    if (order > rating && order - rating < 1) {
      return `${(rating - Math.floor(rating)) * 100}%`
    }
    return '0%'
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
              <StarFilledSvg className={activeClassName} />
            </div>
            <StarFilledGraySvg className={nonActiveClassName} />
          </div>
        ))}
    </div>
  )
}
