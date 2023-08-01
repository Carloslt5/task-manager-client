import { useState } from "react"
import { Link } from "react-router-dom"

const Navigation = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mobileMenuHandler = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-gray-800 p-2 relative">
        <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>

          <div className="flex flex-shrink-0 items-end sm:hidden">
            <button type="button" onClick={mobileMenuHandler} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link to='/' className="text-white hover:underline focus:underline rounded-md px-3 py-2 text-sm font-medium" aria-current="page">HOME</Link>
              <Link to='/about' className="text-white hover:underline focus:underline rounded-md px-3 py-2 text-sm font-medium">ABOUT</Link>
            </div>
          </div>
        </div>

        <div className={mobileMenuOpen
          ? 'flex flex-col justify-center absolute bg-gray-800 w-full left-0 origin-top-right min-h-screen'
          : 'hidden sm:hidden'}
          id="mobile-menu"
        >
          <Link to='/' onClick={mobileMenuHandler} className="text-center text-white hover:underline focus:underline block rounded-md px-3 py-2 text-base font-medium" aria-current="page">HOME</Link>
          <Link to='/about' onClick={mobileMenuHandler} className="text-center text-gray-300 hover:underline focus:underline block rounded-md px-3 py-2 text-base font-medium">ABOUT</Link>
        </div>
      </nav >
    </>
  )
}

export default Navigation



