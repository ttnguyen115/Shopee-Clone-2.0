import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

import { ReactComponent as InvisibleEyes } from 'src/assets/hidden-eyes.svg'
import { ReactComponent as VisibleEyes } from 'src/assets/showed-eyes.svg'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function InputField({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  classNameEye = 'absolute top-[8px] right-[10px] h-5 w-5 cursor-pointer',
  ...rest
}: Props) {
  const [visibleEye, setVisibleEye] = React.useState(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleEyePassword = () => setVisibleEye(!visibleEye)

  const handleInputType = () => {
    if (rest.type === 'password') {
      return visibleEye ? 'text' : 'password'
    }
    return rest.type
  }

  return (
    <div className={className}>
      {rest.type === 'password' && visibleEye && <VisibleEyes className={classNameEye} onClick={toggleEyePassword} />}
      {rest.type === 'password' && !visibleEye && (
        <InvisibleEyes className={classNameEye} onClick={toggleEyePassword} />
      )}
      <input {...registerResult} {...rest} type={handleInputType()} className={classNameInput} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
