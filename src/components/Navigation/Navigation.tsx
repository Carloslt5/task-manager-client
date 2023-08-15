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

  // const MenuList = [
  //   { title: 'Home', src: '/', icon: MdHome },
  //   { title: 'Dashboard', src: '/profile', icon: MdDashboard },
  //   { title: 'Task', src: '/', icon: MdOutlineListAlt },
  //   { title: 'Login / Singup ', src: '/login', icon: MdOutlineLogin },
  //   { title: 'Logout ', src: null, icon: MdOutlineLogin, action: logout },
  //   // { title: 'Inbox', src: 'Chat', icon: MdOutlineListAlt },
  //   // { title: 'Accounts', src: 'User', icon: MdOutlineListAlt },
  //   // { title: 'Schedule ', src: 'Calendar', icon: MdOutlineListAlt },
  //   // { title: 'Search', src: 'Search', icon: MdOutlineListAlt },
  //   // { title: 'Analytics', src: 'Chart', icon: MdOutlineListAlt },

  // ]

  // // const mobileMenuHandler = () => {
  // //   setMobileMenuOpen(!mobileMenuOpen)
  // // }

  return (
    <nav className={`bg-gray-900 h-screen flex flex-col p-4 pt-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}>

      <div className='toggleMenu p-2 rounded-full bg-gray-900 border border-white absolute top-3 -right-3' onClick={() => setToggleMenuOpen(!toggleMenuOpen)}>
        {toggleMenuOpen ? <ArrowLeftIcon /> : <ArrowRigthIcon />}
      </div>

      <Link to={'/'}>
        <div className='navBarTop flex gap-x-2 items-center bg-gray-500 rounded'>
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
                <Link to={'/profile'} className='flex items-center gap-x-4'>
                  <span><MdDashboard /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Dashboard</p>
                </Link>
              </li>
              <li className={' rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300  hover:bg-gray-500 '} >
                <Link to={'/'} className='flex items-center gap-x-4'>
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

