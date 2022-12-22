import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.scss'

function MoviesCardList({
  location,
  isMovieResultError,
  searchError,
  moviesToShow,
  loadMore,
  hasMore,
}) {
  console.log(hasMore, isMovieResultError)
  return (
    <section className="card-list">
      <ul className="card-list__inner">
        {isMovieResultError ? (
          <span className="card-list__error">{searchError}</span>
        ) : (
          moviesToShow.map((movie) => {
            return (
              <MoviesCard
                key={movie.movieId}
                location={location}
                movieData={movie}
              />
            )
          })
        )}
      </ul>
      <div className="card-list__button-wrapper">
        {hasMore && !isMovieResultError ? (
          <button className="card-list__more-button" onClick={loadMore}>
            Ещё
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default MoviesCardList
