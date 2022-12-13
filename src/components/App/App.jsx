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
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import Register from '../Register/Register'
import SavedMovies from '../SavedMovies/SavedMovies'
import './App.scss'

function App() {
  const location = useLocation().pathname

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isPageWithHeader = pageWithHeader.includes(location)
  const isPageWithFooter = pageWithFooter.includes(location)
  return (
    <div className='page'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isPageWithHeader ? <Header isLogin={isLogin} /> : null}
          <Routes>
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/' element={<Main />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <Movies location={location} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <SavedMovies location={location} />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {isPageWithFooter ? <Footer /> : null}
        </>
      )}
    </div>
  )
}

export default App
