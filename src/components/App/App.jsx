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
        localStorage.clear()
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
  const [moviesToShow, setMoviesToShow] = useState([])
  const [moviesToSlice, setMoviesToSlice] = useState([])

  const getMoviesFromBetFilms = async () => {
    setMovieListLoading(true)
    try {
      setIsMovieResultError(false)
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
    if (moviesList) {
      const filteredValue = moviesList.filter((movie) => {
        const rusName = movie.nameRU.toLowerCase()
        const enName = movie.nameEN.toLowerCase()
        const search = searchValue.toLowerCase()
        const textMatch = rusName.includes(search) || enName.includes(search)
        return textMatch
      })
      localStorage.setItem(
        'filteredMoviesByValue',
        JSON.stringify(filteredValue)
      )
      if (isShortFilmsCheck) {
        const filteredByCheck = filteredValue.filter((movie) => {
          return movie.duration <= 40
        })
        return filteredByCheck
      } else {
        return filteredValue
      }
    }
    return []
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
    localStorage.setItem(
      'fullFilteredMovies',
      JSON.stringify(filteredMoviesByFilter)
    )
    return filteredMoviesByFilter
  }

  const determineCardsQty = () => {
    const width = window.innerWidth
    if (width > 1279) {
      return { startCards: 16, aditionalCard: 4 }
    }
    if (width > 767) {
      return { startCards: 8, aditionalCard: 2 }
    }
    return { startCards: 5, aditionalCard: 2 }
  }

  const handleSearchSubmit = async (isChecked, inputValue) => {
    setIsMovieResultError(false)
    localStorage.setItem('isChecked', isChecked)
    localStorage.setItem('inputValue', inputValue)
    const movies = await searchFilms(isChecked, inputValue)
    setMoviesToSlice(movies)
    const films = sliceAfterSearch(movies)
    if (films.length === 0) {
      setIsMovieResultError(true)
      setSearchError('Ничего не найдено')
      return
    }
    setMoviesToShow(films)
    return films
  }
  const sliceAfterSearch = (arr) => {
    const qty = determineCardsQty()
    if (arr.length > qty.startCards) {
      const sliced = arr.slice(0, qty.startCards)
      return sliced
    }
    return arr
  }

  const filterCheckbox = (isChecked) => {
    localStorage.setItem('isChecked', !isChecked)
    const moviesList = JSON.parse(localStorage.getItem('filteredMoviesByValue'))
    if (moviesList) {
      if (!isChecked) {
        const filtered = moviesList.filter((movie) => {
          return movie.duration <= 40
        })
        setMoviesToSlice(filtered)
        const sliced = sliceAfterSearch(filtered)
        setMoviesToShow(sliced)
      } else {
        setMoviesToSlice(moviesList)
        const sliced = sliceAfterSearch(moviesList)
        setMoviesToShow(sliced)
      }
    }
    return
  }

  const loadMore = () => {
    const qty = determineCardsQty()
    const start = moviesToShow.length
    const aditional = qty.aditionalCard
    const end = start + aditional
    const aditionalCards = moviesToSlice.slice(start, end)
    setMoviesToShow([...moviesToShow, ...aditionalCards])
  }
  //получаю фильмы из стора
  useEffect(() => {
    setIsMovieResultError(false)
    const films = JSON.parse(localStorage.getItem('fullFilteredMovies'))
    if (films) {
      setMoviesToSlice(films)
      const sliced = sliceAfterSearch(films)
      setMoviesToShow(sliced)
      return
    }
  }, [])
  //получаю данные профиля юзера
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
                      isMovieResultError={isMovieResultError}
                      searchError={searchError}
                      movieListLoading={movieListLoading}
                      handleSearchSubmit={handleSearchSubmit}
                      moviesToShow={moviesToShow}
                      filterCheckbox={filterCheckbox}
                      loadMore={loadMore}
                      hasMore={
                        moviesToShow.length !== moviesToSlice.length &&
                        moviesToShow.length !== 0
                      }
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute isLogin={isLogin}>
                    <SavedMovies
                      location={location}
                      moviesToShow={moviesToShow}
                    />
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
