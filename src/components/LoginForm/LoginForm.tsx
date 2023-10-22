import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authservices from '@/services/auth.services'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'

const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext) as AuthContextType

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { data } = await authservices.login(loginData)
      storeToken(data.authToken)
      authenticateUser()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { email, password } = loginData

  return (
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100' >
      <form className='w-full p-4 mx-auto rounded bg-slate-700 dark:bg-zinc-800'
        onSubmit={submitHandler}
      >
        <div className='mb-4'>
          <input className='p-2 text-slate-800 dark:text-zinc-800 input-standard' id='email'
            type='email'
            name='email'
            value={email}
            placeholder='Your Email'
            onChange={handlerInputChange}
          />

        </div>
        <div className='mb-6'>
          <input
            className='p-2 text-slate-800 dark:text-zinc-800 input-standard'
            id='password'
            type='password'
            name='password'
            value={password}
            placeholder='******************'
            onChange={handlerInputChange}
          />
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