import React from 'react'
import './SavedMovies.scss'
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'

function SavedMovies({
  location,
  isMovieResultError,
  searchError,
  savedMoviesToShow,
  deleteFromSaveMovie,
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <section className="saved-movies">
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SavedMoviesCardList
            location={location}
            isMovieResultError={isMovieResultError}
            searchError={searchError}
            savedMoviesToShow={savedMoviesToShow}
            deleteFromSaveMovie={deleteFromSaveMovie}
          />
        </>
      )}
    </section>
  )
}

export default SavedMovies
