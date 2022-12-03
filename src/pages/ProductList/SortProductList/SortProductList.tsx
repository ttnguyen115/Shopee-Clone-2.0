import { ReactComponent as ChevronLeftSvg } from 'src/assets/chevron-left.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right.svg'

export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80'>
            Phổ biến
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Mới nhất
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Bán chạy
          </button>
          <select
            className='h-8 bg-white px-4 text-center text-sm capitalize text-black outline-none hover:bg-slate-100'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2 flex'>
            <button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 hover:bg-slate-100'>
              <ChevronLeftSvg />
            </button>
            <button className='h-8 rounded-tr-sm rounded-br-sm bg-white px-3 hover:bg-slate-100'>
              <ChevronRightSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
