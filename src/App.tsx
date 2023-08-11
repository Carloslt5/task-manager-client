import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <div className='block md:flex md:h-screen'>
        <div id='navbar'>
          <Navigation />
        </div>
        <div className='content w-full'>
          <AppRoutes />
          <Footer />
        </div>
      </div>

    </>
  )
}

export default App