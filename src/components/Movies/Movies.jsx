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
  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} onToggle={onToggle} />
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
