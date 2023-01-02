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
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const isPageWithHeader = pageWithHeader.includes(location)
  const isPageWithFooter = pageWithFooter.includes(location)

  const handleGetProfile = () => {
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
          handleError(err)
        })
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
        mainApi
          .signIn({ email: res.email, password: data.password })
          .then((res) => {
            setCurrentUser(res)
            setIsLogin(true)
            navigate('/movies')
            hundleSuccess('Вы успешно были зарегистрированы и авторизованы')
          })
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
      .then(() => {
        unsetAll()
        navigate('/')
        hundleSuccess('Вы успешно вышли, будем ждать Вас вновь')
      })
      .catch((err) => {
        console.log(err)
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
  const [isSavedResultError, setIsSavedResultError] = useState(false)
  const [savedError, setSavedError] = useState('')
  const [movieListLoading, setMovieListLoading] = useState(false)
  const [moviesToShow, setMoviesToShow] = useState([])
  const [moviesToSlice, setMoviesToSlice] = useState([])
  const [savedMoviesFromGet, setSavedMoviesFromGet] = useState([])
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
  // получение фильмов с нашего апи
  const getSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getMyMovies()
      const changed = savedMovies.map((movie) => {
        return { ...movie, isLiked: true }
      })
      setSavedMoviesFromGet(changed)
      setSavedMoviesToShow(changed)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  //общая функция фильтра по инпуту
  const filterByValue = (arr, inputValue) => {
    return arr.filter((movie) => {
      const rusName = movie.nameRU.toLowerCase()
      const enName = movie.nameEN.toLowerCase()
      const search = inputValue.toLowerCase()
      const textMatch = rusName.includes(search) || enName.includes(search)
      return textMatch
    })
  }
  //общая функция фильра по чекбоксу
  const filterByDuration = (arr, isChecked) => {
    if (isChecked) {
      const checkbox = arr.filter((item) => {
        return item.duration <= 40
      })
      return checkbox
    } else {
      return arr
    }
  }
  //фильтрация сперва по значению инпута, промежуточное сохранение, фильтрация по чекбоксу - для страницы фильмы
  const moviesFilter = (moviesList, isShortFilmsCheck, searchValue) => {
    if (moviesList) {
      const filteredValue = filterByValue(moviesList, searchValue)
      localStorage.setItem(
        'filteredMoviesByValue',
        JSON.stringify(filteredValue)
      )
      const filteredByCheck = filterByDuration(filteredValue, isShortFilmsCheck)
      return filteredByCheck
    }
    return []
  }

  const handleSearchSubmitSaved = (isChecked, inputValue) => {
    setIsSavedResultError(false)
    const filteredMovies = filterByValue(savedMoviesFromGet, inputValue)
    setSavedMovieFiltered(filteredMovies)
    const filteredByCheck = filterByDuration(filteredMovies, isChecked)
    setSavedMoviesToShow(filteredByCheck)
    if (filteredByCheck.length === 0) {
      setIsSavedResultError(true)
      setSavedError('Ничего не найдено')
      return
    }
  }
  // фильтрую массив переключая чекбокс
  const filterCheckbox = (isChecked) => {
    localStorage.setItem('isChecked', !isChecked)
    const moviesList = JSON.parse(localStorage.getItem('filteredMoviesByValue'))
    if (moviesList) {
      const filteredByCheck = filterByDuration(moviesList, !isChecked)
      setMoviesToSlice(filteredByCheck)
      const sliced = sliceAfterSearch(filteredByCheck)
      setMoviesToShow(sliced)
    }
    return
  }

  const handleToggleDurationCheck = (isChecked) => {
    if (savedMovieFiltered.length === 0) {
      const filteredByCheck = filterByDuration(savedMoviesFromGet, isChecked)
      setSavedMoviesToShow(filteredByCheck)
      return
    }
    const filteredByCheck = filterByDuration(savedMovieFiltered, isChecked)
    setSavedMoviesToShow(filteredByCheck)
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

  // догружаю на клик фильмы
  const loadMore = () => {
    const qty = determineCardsQty()
    const start = moviesToShow.length
    const aditional = qty.aditionalCard
    const end = start + aditional
    const aditionalCards = moviesToSlice.slice(start, end)
    setMoviesToShow([...moviesToShow, ...aditionalCards])
  }

  const addToSaveMovie = async (movieData) => {
    try {
      const saved = await mainApi.addNewMovie(movieData)
      setSavedMoviesFromGet((movies) => [...movies, saved])
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
      setSavedMoviesFromGet((movies) =>
        movies.filter((movie) => movie._id !== movieData)
      )
    } catch (err) {
      handleError(err)
    }
  }

  const isLikedMovie = (movies) => {
    return movies?.map((movie) => {
      const liked = savedMoviesFromGet.find((saved) => {
        return saved.movieId === movie.movieId
      })
      return liked ? { ...liked, isLiked: true } : { ...movie, isLiked: false }
    })
  }

  const unsetAll = () => {
    navigate('/')
    localStorage.clear()
    setIsLogin(false)
    setCurrentUser(null)
    setMoviesToShow([])
    setSavedMoviesToShow([])
    setMoviesToSlice([])
    setSavedMovieFiltered([])
    setSavedMoviesFromGet([])
    setIsMovieResultError(false)
    setSearchError('')
    setIsSavedResultError(false)
    setMovieListLoading(false)
    setIsError(false)
    setMessage('')
    setIsOpenPopup(false)
    setIsLoading(false)
  }

  const handleError = (err) => {
    if (err.statusCode === 401) {
      unsetAll()
    }
    setIsError(true)
    setIsOpenPopup(true)
    setMessage(err.message)
    setTimeout(() => setIsOpenPopup(false), 2000)
    setTimeout(() => setMessage(''), 3000)
    setTimeout(() => setIsError(false), 3000)
  }

  useEffect(() => {
    handleGetProfile()
  }, [])

  useEffect(() => {
    if (isLogin) {
      setIsSavedResultError(false)
      getSavedMovies()
    }
  }, [isLogin])

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

  useEffect(() => {
    if (savedMoviesFromGet.length > 0) {
      isLikedMovie(moviesToShow)
    }
  }, [savedMoviesToShow.length])

  useEffect(() => {
    setSavedMovieFiltered(savedMoviesFromGet)
  }, [savedMoviesToShow])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {isPageWithHeader ? <Header isLogin={isLogin} /> : null}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                element={
                  <ProtectedRoute condition={!isLogin} redirectTo="/movies" />
                }
              >
                <Route
                  path="/signup"
                  element={
                    <Register
                      message={message}
                      handleRegister={handleRegister}
                    />
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <Login message={message} handleLogin={handleLogin} />
                  }
                />
              </Route>
              <Route
                element={
                  <ProtectedRoute condition={isLogin} redirectTo="/movies" />
                }
              >
                <Route
                  path="/profile"
                  element={
                    <Profile
                      handleLogout={handleLogout}
                      handleUpdateUserInfo={handleUpdateUserInfo}
                      message={message}
                      isError={isError}
                    />
                  }
                />
                <Route
                  path="/movies"
                  element={
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
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <SavedMovies
                      location={location}
                      isError={isSavedResultError}
                      error={savedError}
                      onSubmit={handleSearchSubmitSaved}
                      onToggle={handleToggleDurationCheck}
                      movies={savedMoviesToShow}
                      deleteHandler={deleteFromSaveMovie}
                      initialMovies={savedMoviesFromGet}
                      isErrorSetter={setIsSavedResultError}
                    />
                  }
                />
              </Route>

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
