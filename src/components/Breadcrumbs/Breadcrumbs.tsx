import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()
  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`
      const isLastCrumb = index === array.length - 1

      return (
        <div className={`crumb ${isLastCrumb ? 'last-crumb' : ''}`} key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
          {!isLastCrumb && <span className='mx-1'>{'>'}</span>}
        </div>
      )
    })

  return (
    <div className='flex w-full p-2 text-xs text-slate-500 dark:text-zinc-500'>{crumbs}</div>
  )
}

export default Breadcrumbs
