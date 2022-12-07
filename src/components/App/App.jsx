import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { pageWithFooter, pageWithHeader } from '../../utils/variables'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Preloader from '../Preloader/Preloader'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import './App.scss'

function App() {
  const lokation = useLocation().pathname
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const isPageWithHeader = pageWithHeader.includes(lokation)
  const isPageWithFooter = pageWithFooter.includes(lokation)
  return (
    <div className='page'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isPageWithHeader ? <Header isLogin={isLogin} /> : null}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {isPageWithFooter ? <Footer /> : null}
        </>
      )}
    </div>
  )
}

export default App
