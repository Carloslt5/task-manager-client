import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authservices from '@/services/auth.services'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})
type LoginForm = z.infer<typeof loginSchema>

const LoginForm = () => {

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const { register, handleSubmit } = loginForm
  const [loginErrors, setLoginErrors] = useState([])

  const { storeToken, authenticateUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  const submitHandler = async (loginData: LoginForm) => {
    try {
      const { data } = await authservices.login(loginData)
      storeToken(data.authToken)
      authenticateUser()
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoginErrors(error.response?.data.errorMessages)
      }
    }
  }

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
          {loginErrors.length > 0 && loginErrors.map((elem, index) => <p key={index} className='mt-6 form-error'>{elem}</p>)}
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