import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
// import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='flex h-screen min-w-screen'>
      <div className='h-screen navigation'>
        <Navigation />
      </div>
      <div className='w-full h-screen p-4 overflow-hidden dark:bg-slate-200'>
        <AppRoutes />
        {/* <Footer /> */}
      </div>
    </div >
  )
}

export default App