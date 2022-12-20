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
import InfoPopup from '../InfoPopup/InfoPopup'
import './App.scss'

function App() {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
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
        setMessage('')
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
        setTimeout(() => setMessage(''), 3000)
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
      setTimeout(() => setMessage(''), 3000)
      setTimeout(() => setIsError(false), 3000)
    })
  }

  const hundleSuccess = (message) => {
    setIsError(false)
    setMessage(message)
    setIsOpenPopup(true)
    setTimeout(() => setIsOpenPopup(false), 2000)
    setTimeout(() => setMessage(''), 3000)
  }
  // работа с фильмами
  const [isMovieResultError, setIsMovieResultError] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [movieListLoading, setMovieListLoading] = useState(false)
  const [cardsQty, setCardsQty] = useState({})
  const [moviesToShow, setMoviesToShow] = useState([])

  const getMoviesFromBetFilms = async () => {
    setMovieListLoading(true)
    try {
      const movies = await moviesApi.getMovies()
      localStorage.setItem('betFilms', JSON.stringify(movies))
      return movies
    } catch (err) {
      setIsMovieResultError(true)
      setSearchError(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      )
    } finally {
      setMovieListLoading(false)
    }
  }

  const moviesFilter = (moviesList, isShortFilmsCheck, searchValue) => {
    return moviesList.filter((movie) => {
      const rusName = movie.nameRU.toLowerCase()
      const enName = movie.nameEN.toLowerCase()
      const search = searchValue.toLowerCase()
      const textMatch = rusName.includes(search) || enName.includes(search)
      const durationMatch = isShortFilmsCheck ? movie.duration <= 40 : true
      return textMatch && durationMatch
    })
  }

  const searchFilms = async (isChecked, inputValue) => {
    let moviesList = JSON.parse(localStorage.getItem('betFilms'))
    if (!moviesList) {
      const movies = await getMoviesFromBetFilms()
      moviesList = movies
    }
    const filteredMoviesByFilter = moviesFilter(
      moviesList,
      isChecked,
      inputValue
    )
    return filteredMoviesByFilter
  }

  const determineCardsQty = () => {
    const width = window.innerWidth
    if (width >= 1280) {
      setCardsQty({ starCards: 16, aditionalCard: 4 })
      return
    }
    if (1280 > width >= 768) {
      setCardsQty({ starCards: 8, aditionalCard: 2 })
      return
    }

    setCardsQty({ starCards: 5, aditionalCard: 2 })
  }

  const sliceFilms = async (isChecked, inputValue) => {
    determineCardsQty()
    const movies = await searchFilms(isChecked, inputValue)
    const films = movies.slice(0, cardsQty.starCards)
    console.log(films)
    setMoviesToShow(films)
    return films
  }
  useEffect(() => {
    setTimeout(() => determineCardsQty(), 1000)
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
                      isMovieResultError={isMovieResultError}
                      searchError={searchError}
                      movieListLoading={movieListLoading}
                      sliceFilms={sliceFilms}
                      moviesToShow={moviesToShow}
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
