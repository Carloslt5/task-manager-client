import { useState } from 'react'
import authservices from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

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

    <div className='container mx-auto px-2 my-4 max-w-screen-sm'>
      <form className='w-full max-w-sm mx-auto'
        onSubmit={submitHandler}
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
              First Name
            </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='grid-first-name'
              type='text'
              placeholder='Your First Name'
              name='firstName'
              value={firstName}
              onChange={handlerInputChange}
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-last-name'>
              Last Name
            </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='grid-last-name'
              type='text'
              placeholder='Your Last Name'
              name='lastName'
              value={lastName}
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-email'>
              Email
            </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlinegrid-password'
              id='grid-email'
              type='email'
              placeholder='Example@email.com'
              name='email'
              value={email}
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-password'>
              Password
            </label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlinegrid-password'
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
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>

  )
}
export default SignupPage