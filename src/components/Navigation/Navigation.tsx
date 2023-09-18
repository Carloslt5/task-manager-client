import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import ArrowRigthIcon from '../icons/ArrowRigthIcon'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import Logo from '../icons/Logo'
import { MdDashboard, MdOutlineListAlt, MdOutlineLogin, MdHome, MdLogout, MdSunny, MdBedtime } from 'react-icons/md'
const initialThemeMode = localStorage.getItem('theme') === 'dark'

const Navigation = () => {

  const [darkMode, setDarkMode] = useState(initialThemeMode)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toggleMenuOpen, setToggleMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext) as AuthContextType

  // // const mobileMenuHandler = () => {
  // //   setMobileMenuOpen(!mobileMenuOpen)
  // // }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')

    }
  }, [darkMode])

  const toggleThemeHandler = () => {
    setDarkMode(!darkMode)
  }

  return (
    <nav
      className={`bg-slate-800 dark:bg-zinc-950 dark:text-gray-300 text-white min-h-screen flex flex-col p-4 py-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}>
      <div
        className='absolute p-2 border border-white rounded-full cursor-pointer bg-slate-800 dark:bg-zinc-950 toggleMenu top-3 -right-3'
        onClick={() => setToggleMenuOpen(!toggleMenuOpen)}>
        {toggleMenuOpen ? <ArrowLeftIcon /> : <ArrowRigthIcon />}
      </div>

      <Link to={'/'}>
        <div className='flex items-center rounded hover:bg-slate-600 dark:bg-zinc-800 navBarTop gap-x-2'>
          <span>
            <Logo />
          </span>
          <h1 className={`text-1xl font-bold origin-left whitespace-nowrap duration-300 text-white ${!toggleMenuOpen && 'scale-0'}`}>TODO-APP</h1>
        </div >
      </Link>

      <div className='navBarItems'>
        <ul className='flex flex-col gap-2 pt-6'>
          <li className={'rounded px-2 py-1 cursor-pointer hover:bg-slate-600 dark:hover:bg-zinc-800'} >
            <Link to={'/'} className='flex items-center gap-x-4'>
              <span><MdHome /></span>
              <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Home</p>
            </Link>
          </li>

          {user
            ? <>
              <li className={'rounded cursor-pointer hover:bg-slate-600 dark:hover:bg-zinc-800'} >
                <Link to={`/${user._id}`} className='flex items-center px-2 py-1 gap-x-4 '>
                  <span><MdDashboard /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Dashboard</p>
                </Link>
              </li>
              <li className={' rounded  cursor-pointe rhover:bg-slate-600 dark:hover:bg-zinc-800'} >
                <Link to={`/${user._id}/task`} className='flex items-center px-2 py-1 gap-x-4'>
                  <span><MdOutlineListAlt /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Task</p>
                </Link>
              </li>
              <li className={' rounded  cursor-pointer hover:bg-slate-600 dark:hover:bg-zinc-800'} >
                <button className='flex items-center px-2 py-1 gap-x-4' onClick={logout}>
                  <span><MdLogout /></span>
                  <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Logout</p>
                </button>
              </li>
            </>

            : <li className={' rounded cursor-pointer hover:bg-slate-600 dark:hover:bg-zinc-800'} >
              <Link to={'/login'} className='flex items-center px-2 py-1 gap-x-4'>
                <span><MdOutlineLogin /></span>
                <p className={`origin-left duration-300 whitespace-nowrap ${!toggleMenuOpen && 'scale-0'}`}>Login / Signup</p>
              </Link>
            </li>
          }
        </ul>
      </div>
      <span
        className='p-2 mt-auto rounded cursor-pointer hover:bg-slate-600 dark:hover:bg-zinc-800 w-fit'
        onClick={toggleThemeHandler}
      >
        {darkMode ? <MdSunny /> : <MdBedtime />}
      </span>
    </nav >
  )
}

export default Navigation

