import { arrow, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as CartSvg } from 'src/assets/cart.svg'
import { ReactComponent as ChevronDownSvg } from 'src/assets/chevron-down.svg'
import { ReactComponent as GlobalSvg } from 'src/assets/global.svg'
import { ReactComponent as SearchSvg } from 'src/assets/search.svg'
import { ReactComponent as ShopeeLogoSvg } from 'src/assets/shopee.svg'
import { ReactComponent as UserCircleSvg } from 'src/assets/user-circle.svg'

export default function AppHeader() {
  const arrowRef = React.useRef<HTMLElement>(null)
  const [open, setOpen] = React.useState(true)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })]
  })

  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }

  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <div
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            ref={reference}
            onMouseEnter={showPopover}
            onMouseLeave={hidePopover}
          >
            <GlobalSvg />
            <span className='mx-1'>Tiếng Việt</span>
            <ChevronDownSvg />
            <FloatingPortal>
              <AnimatePresence>
                {open && (
                  <motion.div
                    ref={floating}
                    initial={{ opacity: 0, transform: 'scale(0)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0)' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      width: 'max-content',
                      transformOrigin: `${middlewareData.arrow?.x}px top`
                    }}
                  >
                    <span
                      ref={arrowRef}
                      className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                      style={{
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y
                      }}
                    />
                    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                      <div className='flex flex-col py-2 px-3'>
                        <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                        <button className='py-2 px-3 hover:text-orange'>English</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FloatingPortal>
          </div>
          <div className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <UserCircleSvg />
            </div>
            <div>ttnguyen115</div>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2'>
            <ShopeeLogoSvg className='h-11 fill-white' />
          </Link>
          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                placeholder='Tìm kiếm sản phẩm'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                <SearchSvg />
              </button>
            </div>
          </form>
          <div className='col-span-1'>
            <Link to='/'>
              <CartSvg />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
