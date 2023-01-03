import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './SavedMoviesCardList.scss'

function SavedMoviesCardList({
  location,
  isError,
  error,
  movies,
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
                deleteHandler={deleteHandler}
              />
            )
          })
        )}
      </ul>
    </section>
  )
}

export default SavedMoviesCardList
