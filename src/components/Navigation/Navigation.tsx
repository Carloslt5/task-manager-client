import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import HomeIcon from '../icons/HomeIcon'
import LoginIcon from '../icons/LoginIcon'

const Navigation = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext) as AuthContextType

  const mobileMenuHandler = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav className='bg-gray-800 p-4 md:w-60 md:h-full'>
        <div className='flex justify-between md:flex-col md:gap-6 md:h-full'>
          <Link to='/' >
            <div className='flex gap-4 items-center'>
              <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Your Company' />
              <h1 className='font-bold text-white'>TODO-APP</h1>
            </div>
          </Link>
          <div className='flex flex-shrink-0 items-end md:hidden'>
            <button type='button' onClick={mobileMenuHandler} className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white' aria-controls='mobile-menu' aria-expanded='false'>
              <svg className='block h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
              <svg className='hidden h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='hidden md:block md:h-full'>
            <div className='flex flex-col gap-4 w-full md:h-full'>
              <Link to='/' className='flex gap-2 items-center text-white hover:bg-gray-900 p-2 focus:bg-gray-900 rounded-md text-sm font-medium' aria-current='page'><HomeIcon /> HOME</Link>
              {/* <Link to='/about' className='text-white hover:underline focus:underline rounded-md text-sm font-medium'>ABOUT</Link> */}
              {!user
                ? <Link to='/login' className='flex gap-2 items-center text-white hover:bg-gray-900 p-2 focus:bg-gray-900 rounded-md text-sm font-medium'><LoginIcon /> LOGIN / SIGNUP</Link>
                : <>
                  <Link to='/profile' className='text-white hover:underline focus:underline rounded-md text-sm font-medium'>PROFILE</Link>
                  <button onClick={logout} className='text-white hover:underline focus:underline rounded-md text-sm font-medium'>DISCONECT</button>
                </>
              }
            </div>
          </div>
        </div>

        <div className={mobileMenuOpen
          ? 'flex flex-col justify-center absolute bg-gray-800 w-full left-0 origin-top-right  z-10'
          : 'hidden md:hidden'}
          id='mobile-menu'
        >
          <Link to='/' onClick={mobileMenuHandler} className='text-center text-white hover:underline focus:underline block rounded-md px-3 py-2 text-base font-medium' aria-current='page'>HOME</Link>
          <Link to='/about' onClick={mobileMenuHandler} className='text-center text-gray-300 hover:underline focus:underline block rounded-md px-3 py-2 text-base font-medium'>ABOUT</Link>
          <Link to='/profile' onClick={mobileMenuHandler} className='text-center text-gray-300 hover:underline focus:underline block rounded-md px-3 py-2 text-base font-medium'>PROFILE</Link>
          <button onClick={logout} className='text-white hover:underline focus:underline rounded-md px-3 py-2 text-md font-medium'>DISCONECT</button>
        </div>
      </nav >
    </>
  )
}

export default Navigation

