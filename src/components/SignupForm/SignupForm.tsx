import { useState } from 'react'
import authservices from '../../services/auth.services'
import { useNavigate, Link } from 'react-router-dom'

const SignupForm = () => {

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignupData({ ...signupData, [name]: value })
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('enviando')
    try {
      await authservices.signup(signupData)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const { firstName, lastName, email, password } = signupData

  return (
    <div className='container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100 dark:text-gray-300' >
      <form className='w-full p-4 mx-auto rounded bg-slate-800 dark:bg-zinc-800'
        onSubmit={submitHandler}
      >
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-first-name'>
              First Name
            </label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='grid-first-name'
              type='text'
              placeholder='Your First Name'
              name='firstName'
              value={firstName}
              onChange={handlerInputChange}
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-last-name'>
              Last Name
            </label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='grid-last-name'
              type='text'
              placeholder='Your Last Name'
              name='lastName'
              value={lastName}
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-email'>
              Email
            </label>
            <input className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outlinegrid-password'
              id='grid-email'
              type='email'
              placeholder='Example@email.com'
              name='email'
              value={email}
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className='flex flex-wrap mb-6 -mx-3'>
          <div className='w-full px-3'>
            <label className='block mb-2 text-xs font-bold tracking-wide uppercase' htmlFor='grid-password'>
              Password
            </label>
            <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outlinegrid-password'
              id='grid-password'
              type='password'
              placeholder='******************'
              name='password'
              value={password}
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='submit'>
            Sign Up
          </button>
        </div>
        <hr className='my-8 border' />
        <h5>I have an account
          <Link to='/login' className='ml-2 text-blue-500 hover:underline' aria-current='page'>Log in</Link>
        </h5>
      </form>
    </div>

  )
}

export default SignupForm