import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { pageWithFooter, pageWithHeader } from '../../utils/variables'
import { CurrentUserContext } from '../../context/CurrenUser'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { mainApi } from '../../utils/MainApi.js'
import { moviesApi } from '../../utils/MoviesApi'
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
import InfoPopup from '../InfoPopup/InfoPopup'

function App() {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState(null)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const isPageWithHeader = pageWithHeader.includes(location)
  const isPageWithFooter = pageWithFooter.includes(location)

  const handleGetProfile = () => {
    setIsLoading(true)
    mainApi
      .getUser()
      .then((res) => {
        setCurrentUser(res)
        setIsLogin(true)
        hundleSuccess('Вы успешно были авторизованы')
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

  const handleLogin = (data) => {
    setIsLoading(true)
    mainApi
      .signIn(data)
      .then((res) => {
        setCurrentUser(res.user)
        setIsLogin(true)
        navigate('/movies')
        hundleSuccess('Вы успешно были авторизованы')
      })
      .then(() => {
        handleGetProfile()
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setMessage(null)
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
        navigate('/movies')
        hundleSuccess('Вы успешно были зарегистрированы и авторизованы')
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
        navigate('/')
        hundleSuccess('Вы успешно вышли, будем ждать Вас вновь')
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
        setMessage('Вы успешно отредактировалия профиль')
        setIsError(false)
        setIsOpenPopup(true)
        setTimeout(() => setIsOpenPopup(false), 2000)
        setTimeout(() => setMessage(null), 3000)
      })
      .catch((err) => {
        handleError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleError = (err) => {
    if (err.status === 401) {
      setIsLogin(false)
      setCurrentUser(null)
      navigate('/')
    }
    err.then((err) => {
      setIsError(true)
      setIsOpenPopup(true)
      setMessage(err.message)
      setTimeout(() => setIsOpenPopup(false), 2000)
      setTimeout(() => setMessage(null), 3000)
      setTimeout(() => setIsError(false), 3000)
    })
  }

  const hundleSuccess = (message) => {
    setIsError(false)
    setMessage(message)
    setIsOpenPopup(true)
    setTimeout(() => setIsOpenPopup(false), 2000)
    setTimeout(() => setMessage(null), 3000)
  }
  // работа с фильмами
  const [movies, setMovies] = useState([])
  const [isMovieResultError, setIsMovieResultError] = useState(false)
  const [searchError, setSearchError] = useState('')

  const hundleGetMoviesFromBetFilms = (isChecked, inputValue) => {
    moviesApi
      .getMovies()
      .then((res) => setMovies(res))
      .then((res) => {})
      .catch(() => {
        setIsMovieResultError(true)
        setSearchError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        )
      })
  }
  console.log(movies)
  useEffect(() => {
    handleGetProfile()
  }, [])

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
                  <Register message={message} handleRegister={handleRegister} />
                }
              />
              <Route
                path="/signin"
                element={<Login message={message} handleLogin={handleLogin} />}
              />
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <Profile
                      handleLogout={handleLogout}
                      handleUpdateUserInfo={handleUpdateUserInfo}
                      message={message}
                      isError={isError}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <Movies
                      location={location}
                      hundleGetMoviesFromBetFilms={hundleGetMoviesFromBetFilms}
                      isMovieResultError={isMovieResultError}
                      searchError={searchError}
                    />
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
            <InfoPopup
              isError={isError}
              message={message}
              isOpenPopup={isOpenPopup}
            />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
