import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import InputField from 'src/components/InputField'
import { registerAccount } from 'src/services/apis'
import type { ResponseApi } from 'src/types/utils'
import { isAxiosUnprocessableEntityError, schema, Schema } from 'src/utils'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = _.omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error?.response?.data?.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm' noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <InputField
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errorMessage={errors?.email?.message}
              />
              <InputField
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                className='mt-2'
                errorMessage={errors?.password?.message}
                autoComplete='on'
              />
              <InputField
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Confirm Password'
                className='mt-2'
                errorMessage={errors?.confirm_password?.message}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-300'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  {' '}
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
