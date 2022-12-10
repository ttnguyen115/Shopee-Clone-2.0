import _ from 'lodash'
import React from 'react'

export interface NumberInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const NUMBER_REGEX = /^\d+$/

const NumberInputField = React.forwardRef<HTMLInputElement, NumberInputFieldProps>(function NumberInput(
  {
    errorMessage,
    className,
    classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    onChange,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = React.useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (NUMBER_REGEX.test(value) || _.isEmpty(value)) {
      onChange && onChange(event)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} ref={ref} value={value || localValue} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default NumberInputField
