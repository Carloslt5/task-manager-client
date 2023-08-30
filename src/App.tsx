import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
// import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='flex h-screen'>
      <>
        <Navigation />
      </>
      <div className='flex-grow p-2'>
        <AppRoutes />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App