import clsx from 'clsx'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2

export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number): React.ReactNode | null => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number): React.ReactNode | null => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Conditions to return ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <button
            onClick={() => setPage(pageNumber)}
            key={index}
            className={clsx(
              'mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm',
              pageNumber === page && 'border-cyan-500',
              pageNumber !== page && 'border-transparent'
            )}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPagination()}
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Next</button>
    </div>
  )
}
