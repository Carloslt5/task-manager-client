import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authservices from '../../services/auth.services'
import { AuthContext } from '../../contexts/auth.context'

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)
  if (authContext === null) {
    return
  }
  const { storeToken, authenticateUser } = authContext

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
    <div className='container mx-auto px-2 my-4 max-w-screen-sm'>
      <form className='px-8 py-8 mb-4'
        onSubmit={submitHandler}
      >
        <div className='mb-4'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            value={email}
            placeholder='Your Email'
            onChange={handlerInputChange}
          />

        </div>
        <div className='mb-6'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            value={password}
            placeholder='******************'
            onChange={handlerInputChange}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'
          // disabled={!authContext}
          >
            Log in
          </button>
        </div>
        <hr className='border my-8' />
        <h5>Don't have an account?
          <Link to='/signup' className='ml-2 text-blue-500 hover:underline' aria-current='page'>Sign up</Link>
        </h5>
      </form>
      <p className='text-center text-gray-500 text-xs'>
        &copy; All rights reserved.
      </p>
    </div>
  )
}
export default LoginPage