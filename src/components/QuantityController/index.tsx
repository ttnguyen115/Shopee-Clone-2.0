import _ from 'lodash'
import React from 'react'

import { ReactComponent as MinusSvg } from 'src/assets/minus.svg'
import { ReactComponent as PlusSvg } from 'src/assets/plus.svg'
import NumberInputField, { NumberInputFieldProps } from 'src/components/NumberInputField'

interface Props extends NumberInputFieldProps {
  max?: number
  classNameWrapper?: string
  value?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}

export default function QuantityController({
  max,
  classNameWrapper = 'ml-10',
  value,
  onIncrease,
  onDecrease,
  onType,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (!_.isUndefined(max) && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value) + 1
    if (!_.isUndefined(max) && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const handleDecrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={`${classNameWrapper} flex items-center`}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={handleDecrease}
      >
        <MinusSvg className='h-4 w-4' />
      </button>
      <NumberInputField
        value={value}
        onChange={handleChange}
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center p-1 outline-none'
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={handleIncrease}
      >
        <PlusSvg className='h-4 w-4' />
      </button>
    </div>
  )
}
