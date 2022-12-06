import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React from 'react'
import { useParams } from 'react-router-dom'

import type { Product } from 'src/types/product'

import { productApi } from 'src/services/apis'
import { currencyFormatter, formatNumberToSocialStyle, saleRate } from 'src/utils'

import { ReactComponent as AddToCartSvg } from 'src/assets/add-to-cart.svg'
import { ReactComponent as ChevronLeftSvg } from 'src/assets/chevron-left.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right.svg'
import { ReactComponent as MinusSvg } from 'src/assets/minus.svg'
import { ReactComponent as PlusSvg } from 'src/assets/plus.svg'

import NumberInputField from 'src/components/NumberInputField'
import ProductRating from 'src/components/ProductRating'

export default function ProductDetail() {
  const { id } = useParams()
  const imageRef = React.useRef<HTMLImageElement>(null)
  const [currentIndexImages, setCurrentIndexImages] = React.useState([0, 5])
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const currentImages = React.useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const [activeImage, setActiveImage] = React.useState('')

  React.useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const handleActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const handleNextImage = () => {
    if (currentIndexImages[1] < (product as Product).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handlePrevImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoomImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { style, naturalHeight, naturalWidth } = image

    // Solution 1
    // Avoid 'Event Bubble' => add className point-events-none to img tag
    image.classList.add('pointer-events-none')
    const { offsetX, offsetY } = event.nativeEvent

    // Solution 2: regardless be able to handle 'Event Bubble', this can be handled zoom
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    style.top = top + 'px'
    style.left = left + 'px'
    style.width = naturalWidth + 'px'
    style.height = naturalHeight + 'px'
    style.maxWidth = 'unset'
  }

  // Handle reset image size after mouse moved out
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!product) return null
  const { name, rating, sold, price, price_before_discount, quantity, description } = product

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={name}
                  ref={imageRef}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute top-1/2 left-0 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevImage}
                >
                  <ChevronLeftSvg className='h-5 w-5' />
                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return (
                    <div onMouseEnter={() => handleActiveImage(img)} className='relative w-full pt-[100%]' key={index}>
                      <img
                        src={img}
                        alt={`${name}-${index}`}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute top-1/2 right-0 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNextImage}
                >
                  <ChevronRightSvg className='h-5 w-5' />
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{rating}</span>
                  <ProductRating
                    rating={rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                <div>
                  <span>{formatNumberToSocialStyle(sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{currencyFormatter(price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{currencyFormatter(price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {saleRate(price_before_discount, price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <MinusSvg className='h-4 w-4' />
                  </button>
                  <NumberInputField
                    value={1}
                    className=''
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center p-1 outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'>
                    <PlusSvg className='h-4 w-4' />
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/20'>
                  <AddToCartSvg className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange' /> Thêm vào giỏ
                  hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
          </div>
        </div>
      </div>
    </div>
  )
}
