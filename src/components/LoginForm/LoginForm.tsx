import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin-Hook'

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    submitHandler,
    loginErrors
  } = useLogin()

  return (
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100' >
      <form className='w-full p-4 mx-auto rounded bg-slate-700 dark:bg-zinc-800'
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='mb-4'>
          <input className='p-2 text-slate-800 dark:text-zinc-800 input-standard' id='email'
            type='email'
            placeholder='Your Email'
            {...register('email')}
          />
        </div>
        <div className='mb-6'>
          <input
            className='p-2 text-slate-800 dark:text-zinc-800 input-standard'
            id='password'
            type='password'
            placeholder='******************'
            {...register('password')}
          />
          {loginErrors.length > 0 && loginErrors
            .map((elem, index) => <p key={index} className='mt-6 form-error'>{elem.message}</p>)
          }
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='w-full btn-form '
            type='submit'
          >
            Log in
          </button>
        </div>
        <hr className='my-8' />
        <h5>Don't have an account?
          <Link to='/signup'
            className='ml-2 text-primary-color'
            aria-current='page'>
            Sign up
          </Link>
        </h5>
      </form >
    </div >
  )
}

export default LoginForm