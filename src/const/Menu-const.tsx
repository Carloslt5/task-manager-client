import { MdHome, MdOutlineListAlt, MdDashboard, MdOutlineLogin, MdLogout } from 'react-icons/md'
import { UserData } from '../contexts/Types/AuthContext.types'

export const APP_NAME = 'TODO-APP'

export const getUserMenuConstants = (user: UserData, logout: () => void) => {
  const MENU_CONST_USER = [
    {
      title: 'Home',
      src: '/',
      icon: <MdHome />,
    },
    {
      title: 'Task',
      src: `${user?._id}/task`,
      icon: <MdOutlineListAlt />,

    },
    {
      title: 'Dashboard',
      src: `/${user._id}`,
      icon: <MdDashboard />,
    },
    {
      title: 'Logout',
      src: '',
      icon: <MdLogout />,
      onClick: logout
    },
  ]
  return MENU_CONST_USER
}

export const getNoUserMenuConstants = () => {
  const MENU_CONST_NO_USER = [
    {
      title: 'Home',
      src: '/',
      icon: <MdHome />,

    },
    {
      title: 'Login / Signup',
      src: '/login',
      icon: <MdOutlineLogin />,

    }
  ]
  return MENU_CONST_NO_USER
}
