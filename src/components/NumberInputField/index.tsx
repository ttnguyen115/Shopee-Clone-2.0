import _ from 'lodash'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const NUMBER_REGEX = /^\d+$/

const NumberInputField = React.forwardRef<HTMLInputElement, Props>(function NumberInput(
  {
    errorMessage,
    className,
    classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (NUMBER_REGEX.test(value) || _.isEmpty(value)) {
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} ref={ref} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default NumberInputField
