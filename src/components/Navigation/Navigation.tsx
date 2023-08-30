import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import ArrowRigthIcon from '../icons/ArrowRigthIcon'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import Logo from '../icons/Logo'
import { MdDashboard, MdOutlineListAlt, MdOutlineLogin, MdHome, MdLogout } from 'react-icons/md'

const Navigation = () => {

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toggleMenuOpen, setToggleMenuOpen] = useState(true)
  const { user, logout } = useContext(AuthContext) as AuthContextType

  // // const mobileMenuHandler = () => {
  // //   setMobileMenuOpen(!mobileMenuOpen)
  // // }

  return (
    <nav className={`bg-gray-900 min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}>

      <div className='absolute p-2 bg-gray-900 border border-white rounded-full toggleMenu top-3 -right-3' onClick={() => setToggleMenuOpen(!toggleMenuOpen)}>
        {toggleMenuOpen ? <ArrowLeftIcon /> : <ArrowRigthIcon />}
      </div>

      <Link to={'/'}>
        <div className='flex items-center bg-gray-500 rounded navBarTop gap-x-2'>
          <span>
            <Logo />
          </span>
          <h1 className={`text-1xl font-bold origin-left text-white whitespace-nowrap duration-300 ${!toggleMenuOpen && 'scale-0'}`}>TODO-APP</h1>
        </div >
      </Link>

      <div className='navBarItems'>
        <ul className='pt-6'>
          <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
            <Link to={'/'} className='flex items-center gap-x-4'>
              <span><MdHome /></span>
              <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Home</p>
            </Link>
          </li>

          {user
            ? <>
              <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
                <Link to={`/${user._id}`} className='flex items-center gap-x-4'>
                  <span><MdDashboard /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Dashboard</p>
                </Link>
              </li>
              <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
                <Link to={`/${user._id}/task`} className='flex items-center gap-x-4'>
                  <span><MdOutlineListAlt /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Task</p>
                </Link>
              </li>
              <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
                <button className='flex items-center gap-x-4' onClick={logout}>
                  <span><MdLogout /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Logout</p>
                </button>
              </li>
            </>

            : <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
              <Link to={'/login'} className='flex items-center gap-x-4'>
                <span><MdOutlineLogin /></span>
                <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Login / Signup</p>
              </Link>
            </li>
          }
        </ul>
      </div>
    </nav >
  )
}

export default Navigation

