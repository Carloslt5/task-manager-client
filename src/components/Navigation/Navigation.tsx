import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import ArrowRigthIcon from '../icons/ArrowRigthIcon'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import Logo from '../icons/Logo'
import { MdDashboard, MdOutlineListAlt } from 'react-icons/md'

const Navigation = () => {

  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toggleMenuOpen, setToggleMenuOpen] = useState(true)
  const { user, logout } = useContext(AuthContext) as AuthContextType

  const MenuList = [
    { title: 'Dashboard', src: '/profile', icon: MdDashboard },
    { title: 'Task', src: '/', icon: MdOutlineListAlt },
    { title: 'Inbox', src: 'Chat' },
    { title: 'Accounts', src: 'User' },
    { title: 'Schedule ', src: 'Calendar' },
    { title: 'Search', src: 'Search' },
    { title: 'Analytics', src: 'Chart' },
    { title: 'Files ', src: 'Folder' },
    { title: 'Setting', src: 'Setting' },
  ]

  // const mobileMenuHandler = () => {
  //   setMobileMenuOpen(!mobileMenuOpen)
  // }

  return (
    <nav className={`bg-gray-900 h-screen flex flex-col p-4 pt-8 relative duration-300  ${toggleMenuOpen ? 'w-60' : 'w-16'}`}>

      <div className='toggleMenu p-2 rounded-full bg-gray-900 border border-white absolute top-3 -right-3' onClick={() => setToggleMenuOpen(!toggleMenuOpen)}>
        {toggleMenuOpen ? <ArrowRigthIcon /> : <ArrowLeftIcon />}
      </div>

      <Link to={'/'}>
        <div className='navBarTop flex gap-x-4 items-center bg-gray-500 rounded'>
          <span>
            <Logo />
          </span>
          <h1 className={`text-1xl font-bold origin-left text-white whitespace-nowrap duration-300 ${!toggleMenuOpen && 'scale-0'}`}>TODO-APP</h1>
        </div >
      </Link>

      <div className='navBarItems'>
        <ul className='pt-6'>
          {MenuList.map((Menu, index) => (
            <Link to={Menu.src} key={index}>
              < li className={'flex rounded px-2 py-1 cursor-pointer hover:bg-light-white text-gray-300 tex t-sm items-center gap-x-4 hover:bg-gray-500 '} >
                <span>
                  {Menu.icon && <Menu.icon />}
                </span>
                <p className={`origin-left duration-300 ${!toggleMenuOpen && 'scale-0'}`}>
                  {Menu.title}
                </p>
              </ li>
            </Link>

          ))}
        </ul>

      </div>

    </nav >
  )
}

export default Navigation

