import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import './Movies.scss'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies({
  location,
  isMovieResultError,
  searchError,
  movieListLoading,
  searchFilm,
}) {
  return (
    <main className="movies">
      <SearchForm searchFilm={searchFilm} />
      {movieListLoading ? (
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
