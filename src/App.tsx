import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='flex h-screen min-w-screen'>
      <div className='h-screen navigation'>
        <Navigation />
      </div>
      <div className='w-full h-screen p-4 overflow-hidden transition-all duration-300 dark:bg-zinc-900 bg-slate-200'>
        <AppRoutes />
      </div>
      <ToastContainer
        theme='colored'
        position='bottom-right'
        autoClose={4000} />
    </div >
  )
}

export default App