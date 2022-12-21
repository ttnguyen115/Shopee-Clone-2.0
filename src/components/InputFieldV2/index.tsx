import isEmpty from 'lodash/isEmpty'
import React from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type InputFieldV2Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

const NUMBER_REGEX = /^\d+$/

export function InputFieldV2<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputFieldV2Props<TFieldValues, TName>) {
  const {
    type,
    className,
    classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    onChange,
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = React.useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const numberCondition = (type === 'number' && NUMBER_REGEX.test(inputValue)) || isEmpty(inputValue)

    if (numberCondition || type !== 'number') {
      setLocalValue(inputValue)
      field.onChange(event)
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
