import authservices from '@/services/auth.services'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { useState } from 'react'

export type ValidationError = {
  path: string[]
  message: string
};

type SignUpData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignupForm = () => {

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })

  const { register, handleSubmit } = form
  const [signUpErrors, setSignUpErrors] = useState<ValidationError[]>([])

  const navigate = useNavigate()

  const submitHandler = async (signUpData: SignUpData) => {
    try {
      await authservices.signup(signUpData)
      navigate('/login')
    } catch (error) {
      //Mensaje torty error server
      if (error instanceof AxiosError) {
        setSignUpErrors(error.response?.data)
      }
    }
  }

  return (
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100 dark:text-gray-300' >
      <form className='w-full p-4 mx-auto rounded bg-slate-700 dark:bg-zinc-800'
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='flex flex-wrap gap-3 mb-3'>
          <div className='flex-1 '>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-first-name'>
              First Name
            </label>
            <input className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-first-name'
              type='text'
              placeholder='Your First Name'
              {...register('firstName')}
            />
            {
              signUpErrors.length > 0 &&
              signUpErrors
                .filter(error => error.path[1] === 'firstName')
                .map((error, index) => (
                  <p key={index} className='form-error'>{error.message}</p>
                ))
            }
          </div>
          <div className='flex-1'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-last-name'>
              Last Name
            </label>
            <input className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-last-name'
              type='text'
              placeholder='Your Last Name'
              {...register('lastName')}
            />
            {
              signUpErrors.length > 0 &&
              signUpErrors
                .filter(error => error.path[1] === 'lastName')
                .map((error, index) => (
                  <p key={index} className='form-error'>{error.message}</p>
                ))
            }
          </div>
        </div>
        <div className='flex flex-wrap mb-3'>
          <div className='w-full'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-email'>
              Email
            </label>
            <input
              className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-email'
              type='email'
              placeholder='Example@email.com'
              {...register('email')}
            />
            {
              signUpErrors.length > 0 &&
              signUpErrors
                .filter(error => error.path[1] === 'email')
                .map((error, index) => (
                  <p key={index} className='form-error'>{error.message}</p>
                ))
            }
          </div>
        </div>
        <div className='flex flex-wrap mb-6'>
          <div className='w-full'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-password'>
              Password
            </label>
            <input
              className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-password'
              type='password'
              placeholder='*********'
              {...register('password')}
            />
            {
              signUpErrors.length > 0 &&
              signUpErrors
                .filter(error => error.path[1] === 'password')
                .map((error, index) => (
                  <p key={index} className='form-error'>{error.message}</p>
                ))
            }
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full btn-form '
            type='submit'>
            Sign Up
          </button>
        </div>
        <hr className='my-8 border' />
        <h5>
          I have an account
          <Link to='/login'
            className='ml-2 text-primary-color'
            aria-current='page'>
            Log in
          </Link>
        </h5>
      </form>
    </div>

  )
}

export default SignupForm