import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.scss'

function MoviesCardList({
  location,
  isMovieResultError,
  searchError,
  moviesToShow,
}) {
  return (
    <section className="card-list">
      <ul className="card-list__inner">
        {isMovieResultError ? (
          <span>{searchError}</span>
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
        <button className="card-list__more-button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList
