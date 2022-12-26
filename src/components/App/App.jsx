import { useState, useEffect, useLayoutEffect } from 'react'
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
        unsetAll()
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
    err.then((err) => {
      if (err.statusCode === 401) {
        unsetAll()
      }
      setIsError(true)
      setIsOpenPopup(true)
      setMessage(err.message)
      setTimeout(() => setIsOpenPopup(false), 2000)
      setTimeout(() => setMessage(''), 3000)
      setTimeout(() => setIsError(false), 3000)
    })
  }
  const unsetAll = () => {
    navigate('/')
    localStorage.clear()
    setIsLogin(false)
    setCurrentUser(null)
    setMoviesToShow({})
    setMoviesToSlice({})
    setSavedMovieFiltered({})
    setSavedMoviesToShow({})
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
  const [savedMovieFiltered, setSavedMovieFiltered] = useState([])
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([])
  //получение фильмов с бетфилмс
  const getMoviesFromBetFilms = async () => {
    setMovieListLoading(true)
    try {
      setIsMovieResultError(false)
      const movies = await moviesApi.getMovies()
      localStorage.setItem('betFilms', JSON.stringify(movies))
      return movies
    } catch (err) {
      handleError(err)
      setIsMovieResultError(true)
      setSearchError(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      )
    } finally {
      setMovieListLoading(false)
    }
  }
  //фильтрация сперва по значению инпута, промежуточное сохранение, фильтрация по чекбоксу
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
  // ищем фильмы в локалсторадже или запрашиваем с сервера
  const searchFilmsFromBet = async (isChecked, inputValue) => {
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
  //измеряю экран для количества отображения и дополнительных подзагрузок
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
  // слайсю отфильтрованный массив для отображения стартового количество карточек
  const sliceAfterSearch = (arr) => {
    const qty = determineCardsQty()
    if (arr.length > qty.startCards) {
      const sliced = arr.slice(0, qty.startCards)
      return sliced
    }
    return arr
  }
  // фильтрую массив переключая чекбокс
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
  // собирает данные поиска и показывает их на страницу фильмы
  const handleSearchSubmit = async (isChecked, inputValue) => {
    setIsMovieResultError(false)
    localStorage.setItem('isChecked', isChecked)
    localStorage.setItem('inputValue', inputValue)
    const movies = await searchFilmsFromBet(isChecked, inputValue)
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

  const handleSearchSubmitSaved = (isChecked, inputValue) => {
    setIsMovieResultError(false)
    const movies = savedMoviesToShow
    const filteredMovies = movies.filter((movie) => {
      const rusName = movie.nameRU.toLowerCase()
      const enName = movie.nameEN.toLowerCase()
      const search = inputValue.toLowerCase()
      const textMatch = rusName.includes(search) || enName.includes(search)
      return textMatch
    })
    setSavedMovieFiltered(filteredMovies)
    if (isChecked) {
      const checkBox = filteredMovies.filter((movie) => {
        const checkBox = movie.duration <= 40
        return checkBox
      })
      setMoviesToShow(checkBox)
      return
    }
    if (filteredMovies.length === 0) {
      setIsMovieResultError(true)
      setSearchError('Ничего не найдено')
      return
    }
    setSavedMoviesToShow(filteredMovies)
  }

  const handleToggleDurationCheck = (isCheck) => {
    if (isCheck) {
      const checkBox = savedMovieFiltered.filter((movie) => {
        return movie.duration <= 40
      })
      setMoviesToShow(checkBox)
      return
    } else {
      setMoviesToShow(savedMovieFiltered)
    }
  }
  console.log(savedMoviesToShow)
  // догружаю на клик фильмы
  const loadMore = () => {
    const qty = determineCardsQty()
    const start = moviesToShow.length
    const aditional = qty.aditionalCard
    const end = start + aditional
    const aditionalCards = moviesToSlice.slice(start, end)
    setMoviesToShow([...moviesToShow, ...aditionalCards])
  }

  const getSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getMyMovies()
      setSavedMoviesToShow(savedMovies)
    } catch (err) {
      handleError(err)
    }
  }

  const addToSaveMovie = async (movieData) => {
    try {
      const saved = await mainApi.addNewMovie(movieData)
      setSavedMoviesToShow((movies) => [...movies, saved])
      setSavedMovieFiltered((movies) => [...movies, saved])
      return saved
    } catch (err) {
      handleError(err)
    }
  }

  const deleteFromSaveMovie = async (movieData) => {
    try {
      await mainApi.deleteMovie(movieData)
      setSavedMoviesToShow((movies) =>
        movies.filter((movie) => movie._id !== movieData)
      )
      setSavedMovieFiltered((movies) =>
        movies.filter((movie) => movie._id !== movieData)
      )
    } catch (err) {
      handleError(err)
    }
  }

  const isLikedMovie = (movies) => {
    return movies.map((movie) => {
      const liked = savedMoviesToShow.find((saved) => {
        return saved.movieId === movie.movieId
      })
      return liked ? { ...liked, isLiked: true } : { ...movie, isLiked: false }
    })
  }

  useEffect(() => {
    if (savedMoviesToShow.length > 0) {
      isLikedMovie(moviesToShow)
    }
  }, [savedMoviesToShow.length])
  //получаю фильмы из локалстора
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
  useEffect(() => {
    if (isLogin) {
      getSavedMovies()
    }
  }, [isLogin])
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
                      isError={isMovieResultError}
                      error={searchError}
                      onSubmit={handleSearchSubmit}
                      onToggle={filterCheckbox}
                      movies={isLikedMovie(moviesToShow)}
                      deleteHandler={deleteFromSaveMovie}
                      saveHandler={addToSaveMovie}
                      preloading={movieListLoading}
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
                      isError={isMovieResultError}
                      error={searchError}
                      onSubmit={handleSearchSubmitSaved}
                      onToggle={handleToggleDurationCheck}
                      movies={savedMoviesToShow}
                      deleteHandler={deleteFromSaveMovie}
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
