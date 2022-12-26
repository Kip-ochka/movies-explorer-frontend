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
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <section className="saved-movies">
      <SearchForm onSubmit={onSubmit} onToggle={onToggle} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SavedMoviesCardList
            location={location}
            isError={isError}
            error={error}
            movies={movies}
            deleteHandler={deleteHandler}
          />
        </>
      )}
    </section>
  )
}

export default SavedMovies
