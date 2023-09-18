import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authservices from '../../services/auth.services'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'

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
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100 dark:text-gray-300' >
      <form className='w-full p-4 mx-auto rounded bg-slate-800 dark:bg-zinc-800'
        onSubmit={submitHandler}
      >
        <div className='mb-4'>
          <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow outline-none appearance-none focus:ring-2 focus:ring-blue-500'
            id='email'
            type='email'
            name='email'
            value={email}
            placeholder='Your Email'
            onChange={handlerInputChange}
          />

        </div>
        <div className='mb-6'>
          <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            value={password}
            placeholder='******************'
            onChange={handlerInputChange}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='submit'
          // disabled={!authContext}
          >
            Log in
          </button>
        </div>
        <hr className='my-8' />
        <h5>Don't have an account?
          <Link to='/signup' className='ml-2 text-blue-500 hover:underline' aria-current='page'>Sign up</Link>
        </h5>
      </form>
    </div >
  )
}

export default LoginForm