import authservices from '@/services/auth.services'
import { useNavigate, Link } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
  firstName: z.string().min(3, 'Name requires a minimum of 3 characters'),
  lastName: z.string().min(3, 'Last Name requires a minimum of 3 characters'),
  email: z.string().email('This is not a valid email'),
  password: z.string().min(4, 'Password requires a minimum of 4 characters'),
})

type SignUpForm = z.infer<typeof signUpSchema>

const SignupForm = () => {

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const navigate = useNavigate()

  const submitHandler = async (data: SignUpForm) => {
    try {
      await authservices.signup(data)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100 dark:text-gray-300' >
      <form className='w-full p-4 mx-auto rounded bg-slate-700 dark:bg-zinc-800'
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-first-name'>
              First Name
            </label>
            <input className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-first-name'
              type='text'
              placeholder='Your First Name'
              {...register('firstName')}
            />
            <p className='form-error'>{errors.firstName?.message}</p>
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-last-name'>
              Last Name
            </label>
            <input className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-last-name'
              type='text'
              placeholder='Your Last Name'
              {...register('lastName')}
            />
            <p className='form-error'>{errors.lastName?.message}</p>
          </div>
        </div>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3'>
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
            <p className='form-error'>{errors.email?.message}</p>

          </div>
        </div>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-password'>
              Password
            </label>
            <input
              className='p-2 input-standard dark:text-zinc-800 text-slate-800'
              id='grid-password'
              type='password'
              placeholder='******************'
              {...register('password')}
            />
            <p className='form-error'>{errors.password?.message}</p>
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