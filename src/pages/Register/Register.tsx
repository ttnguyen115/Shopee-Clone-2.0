import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputField from 'src/components/InputField'
import { getRules } from 'src/utils'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <InputField
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errorMessage={errors?.email?.message}
                rules={rules.email}
              />
              <InputField
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                className='mt-2'
                errorMessage={errors?.password?.message}
                rules={rules.password}
                autoComplete='on'
              />
              <InputField
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Confirm Password'
                className='mt-2'
                errorMessage={errors?.confirm_password?.message}
                rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'>
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
