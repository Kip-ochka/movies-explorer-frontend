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
  handleSearchSubmit,
  moviesToShow,
  filterCheckbox,
  loadMore,
  hasMore,
  addToSaveMovie,
  deleteFromSaveMovie,
}) {
  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        filterCheckbox={filterCheckbox}
      />
      {movieListLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            location={location}
            isMovieResultError={isMovieResultError}
            searchError={searchError}
            moviesToShow={moviesToShow}
            loadMore={loadMore}
            hasMore={hasMore}
            addToSaveMovie={addToSaveMovie}
            deleteFromSaveMovie={deleteFromSaveMovie}
          />
        </>
      )}
    </main>
  )
}

export default Movies
