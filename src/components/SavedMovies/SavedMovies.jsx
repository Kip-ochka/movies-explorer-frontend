import React from 'react'
import './SavedMovies.scss'
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'

function SavedMovies({
  location,
  isError,
  error,
  onSubmit,
  onToggle,
  movies,
  deleteHandler,
  initialMovies,
  isErrorSetter,
  isLogin,
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isChecked, setIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [inputValues, setInputValues] = React.useState('')
  const [moviesToShow, setMoviesToShow] = React.useState(initialMovies)

  const handleToggle = () => {
    onToggle(!isChecked)
    setIsChecked((v) => !v)
    setMoviesToShow(movies)
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled((v) => !v)
    }, 500)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!inputValues) {
      setValidationMessage('Нужно ввести ключевое слово')
      return
    }
    onSubmit(isChecked, inputValues)
    setMoviesToShow(movies)
  }

  const handleChange = (evt) => {
    if (!inputValues) {
      setValidationMessage('')
    }
    setInputValues(evt.target.value)
  }
  React.useEffect(() => {
    setMoviesToShow(movies)
  }, [movies])

  React.useEffect(() => {
    isErrorSetter(false)
    setMoviesToShow(initialMovies)
    setIsChecked(false)
    onToggle(isChecked)
  }, [])

  return (
    <section className="saved-movies">
      <SearchForm
        validationMessage={validationMessage}
        inputValues={inputValues}
        isChecked={isChecked}
        isDisabled={isDisabled}
        handleCheck={handleToggle}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SavedMoviesCardList
            location={location}
            isError={isError}
            error={error}
            movies={moviesToShow}
            deleteHandler={deleteHandler}
            initialMovies={initialMovies}
            isLogin={isLogin}
          />
        </>
      )}
    </section>
  )
}

export default SavedMovies
