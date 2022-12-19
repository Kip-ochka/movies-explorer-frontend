import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import { useLocation } from 'react-router-dom'

function Movies({
  location,
  hundleGetMoviesFromBetFilms,
  isMovieResultError,
  searchError,
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <main className="movies">
      <SearchForm hundleGetMoviesFromBetFilms={hundleGetMoviesFromBetFilms} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            location={location}
            isMovieResultError={isMovieResultError}
            searchError={searchError}
          />
        </>
      )}
    </main>
  )
}

export default Movies
