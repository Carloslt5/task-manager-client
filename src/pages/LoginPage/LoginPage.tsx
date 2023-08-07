import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='container mx-auto px-2 my-4 max-w-screen-sm'>
      <form className='px-8 py-8 mb-4'>
        <div className='mb-4'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
        </div>
        <div className='mb-6'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' />
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
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