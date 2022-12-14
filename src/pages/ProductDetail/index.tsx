import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as AddToCartSvg } from 'src/assets/add-to-cart.svg'
import { ReactComponent as ChevronLeftSvg } from 'src/assets/chevron-left.svg'
import { ReactComponent as ChevronRightSvg } from 'src/assets/chevron-right.svg'
import ProductRating from 'src/components/ProductRating'
import ProductItem from 'src/pages/ProductList/components/ProductItem'

import type { Product, ProductListConfig } from 'src/types/product'

import { convert } from 'html-to-text'
import { toast } from 'react-toastify'
import QuantityController from 'src/components/QuantityController'
import { AppRoutes, PurchasesStatus, queryTime } from 'src/constants'
import { productApi, purchaseApi } from 'src/services/apis'
import { currencyFormatter, formatNumberToSocialStyle, getIdFromNameId, saleRate } from 'src/utils'

export default function ProductDetail() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const [currentIndexImages, setCurrentIndexImages] = React.useState([0, 5])
  const [activeImage, setActiveImage] = React.useState('')
  const [buyCount, setBuyCount] = React.useState(1)
  const addToCartMutation = useMutation(purchaseApi.addToCart)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data.data
  const currentImages = React.useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: queryTime.PRODUCT_STALE_TIME
  })

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

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (response) => {
          toast.success(response.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.IN_CART }] })
        }
      }
    )
  }

  const buyNow = async () => {
    const {
      data: { data: purchase }
    } = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    navigate(AppRoutes.APP_CART, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  const { name, rating, sold, price, price_before_discount, quantity, description } = product

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{name} | Shopee Clone</title>
        <meta
          name='description'
          content={convert(description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
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
                  <span className='ml-1 text-gray-500'>???? b??n</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>??{currencyFormatter(price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>??{currencyFormatter(price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {saleRate(price_before_discount, price)} gi???m
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>S??? l?????ng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{quantity} s???n ph???m c?? s???n</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/20'
                >
                  <AddToCartSvg className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange' /> Th??m v??o gi???
                  h??ng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>M?? t??? s???n ph???m</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>C?? th??? b???n c??ng th??ch</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
