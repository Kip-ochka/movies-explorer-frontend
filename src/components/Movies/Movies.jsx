import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({
  location,
  isError,
  error,
  onSubmit,
  onToggle,
  movies,
  deleteHandler,
  saveHandler,
  preloading,
  loadMore,
  hasMore,
}) {
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isChecked, setIsChecked] = React.useState(
    JSON.parse(localStorage.getItem('isChecked') || false)
  )
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [inputValues, setInputValues] = React.useState(
    localStorage.getItem('inputValue') || ''
  )
  const handleCheck = () => {
    setIsChecked((v) => !v)
    onToggle(isChecked)
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
  }

  const handleChange = (evt) => {
    if (!inputValues) {
      setValidationMessage('')
    }
    setInputValues(evt.target.value)
  }
  return (
    <main className="movies">
      <SearchForm
        validationMessage={validationMessage}
        inputValues={inputValues}
        isChecked={isChecked}
        isDisabled={isDisabled}
        handleCheck={handleCheck}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {preloading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            location={location}
            isError={isError}
            error={error}
            movies={movies}
            loadMore={loadMore}
            hasMore={hasMore}
            saveHandler={saveHandler}
            deleteHandler={deleteHandler}
          />
        </>
      )}
    </main>
  )
}

export default Movies
