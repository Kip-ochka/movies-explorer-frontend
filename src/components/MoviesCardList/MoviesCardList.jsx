import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.scss'

function MoviesCardList({
  location,
  isError,
  error,
  movies,
  loadMore,
  hasMore,
  saveHandler,
  deleteHandler,
}) {
  return (
    <section className="card-list">
      <ul className="card-list__inner">
        {isError ? (
          <span className="card-list__error">{error}</span>
        ) : (
          movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.movieId}
                location={location}
                movieData={movie}
                saveHandler={saveHandler}
                deleteHandler={deleteHandler}
              />
            )
          })
        )}
      </ul>
      <div className="card-list__button-wrapper">
        {hasMore && !isError ? (
          <button className="card-list__more-button" onClick={loadMore}>
            Ещё
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default MoviesCardList
