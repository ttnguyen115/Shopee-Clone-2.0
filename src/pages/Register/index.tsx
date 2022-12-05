import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import Button from 'src/components/Button'
import InputField from 'src/components/InputField'

import { AppRoutes } from 'src/constants'
import { AppContext } from 'src/contexts/app'
import { authApi } from 'src/services/apis'
import type { ErrorResponse } from 'src/types/utils'
import { isAxiosUnprocessableEntityError, schema, Schema } from 'src/utils'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = React.useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = _.omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (mutationResponse) => {
        const {
          data: { data: userResponse }
        } = mutationResponse
        setIsAuthenticated(true)
        setProfile(userResponse.user)
        navigate(AppRoutes.APP_HOMEPAGE)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
                <Button
                  type='submit'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-slate-300'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={AppRoutes.APP_LOGIN}>
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
