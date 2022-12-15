import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { pageWithFooter, pageWithHeader } from '../../utils/variables'
import { CurrentUserContext } from '../../context/CurrenUser'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { mainApi } from '../../utils/MainApi.js'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Preloader from '../Preloader/Preloader'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import SavedMovies from '../SavedMovies/SavedMovies'

import './App.scss'
import userEvent from '@testing-library/user-event'

function App() {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const isPageWithHeader = pageWithHeader.includes(location)
  const isPageWithFooter = pageWithFooter.includes(location)

  const handleGetProfile = () => {
    setIsLoading(true)
    mainApi
      .getUser()
      .then((res) => {
        setCurrentUser(res)
        setIsLogin(true)
        setIsError(false)
      })
      .catch((err) => {
        err.then((err) => {
          setIsError(true)
          console.log(err.message)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    handleGetProfile()
  }, [])

  const handleLogin = (data) => {
    setIsLoading(true)
    mainApi
      .signIn(data)
      .then((res) => {
        setCurrentUser(res.user)
        setIsLogin(true)
        navigate('/movies')
      })
      .then(() => {
        handleGetProfile()
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setError(null)
        setIsLoading(false)
      })
  }

  const handleRegister = (data) => {
    setIsLoading(true)
    mainApi
      .signUp(data)
      .then((res) => {
        setCurrentUser(res)
        setIsLogin(true)
        setIsError(false)
        navigate('/movies')
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleLogout = () => {
    setIsLoading(true)
    mainApi
      .logout()
      .then((res) => {
        setCurrentUser(null)
        setIsLogin(false)
        setIsError(false)
        navigate('/')
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleUpdateUserInfo = (userData) => {
    setIsLoading(true)
    mainApi
      .updateUserInfo(userData)
      .then((res) => {
        setCurrentUser(res)
        setError('Вы успешно отредактировалия профиль')
        setIsError(false)
        setTimeout(() => setError(null), 2000)
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleError = (err) => {
    err.then((err) => {
      setIsError(true)
      setError(err.message)
      setTimeout(() => setError(null), 2000)
      setTimeout(() => setIsError(false), 2000)
    })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {isPageWithHeader ? <Header isLogin={isLogin} /> : null}
            <Routes>
              <Route
                path="/signup"
                element={
                  <Register error={error} handleRegister={handleRegister} />
                }
              />
              <Route
                path="/signin"
                element={<Login error={error} handleLogin={handleLogin} />}
              />
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <Profile
                      handleLogout={handleLogout}
                      handleUpdateUserInfo={handleUpdateUserInfo}
                      error={error}
                      isError={isError}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <Movies location={location} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <SavedMovies location={location} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isPageWithFooter ? <Footer /> : null}
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
