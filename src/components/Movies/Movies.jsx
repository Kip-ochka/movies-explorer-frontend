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
  sliceFilms,
  moviesToShow,
  filterCheckbox,
}) {
  return (
    <main className="movies">
      <SearchForm sliceFilms={sliceFilms} filterCheckbox={filterCheckbox} />
      {movieListLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            location={location}
            isMovieResultError={isMovieResultError}
            searchError={searchError}
            moviesToShow={moviesToShow}
          />
        </>
      )}
    </main>
  )
}

export default Movies
