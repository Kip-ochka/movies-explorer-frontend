import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './SavedMoviesCardList.scss'

function SavedMoviesCardList({
  location,
  isMovieResultError,
  searchError,
  savedMoviesToShow,
  deleteFromSaveMovie,
}) {
  return (
    <section className="card-list">
      <ul className="card-list__inner">
        {isMovieResultError ? (
          <span className="card-list__error">{searchError}</span>
        ) : (
          savedMoviesToShow.map((movie) => {
            return (
              <MoviesCard
                key={movie.movieId}
                location={location}
                movieData={movie}
                deleteFromSaveMovie={deleteFromSaveMovie}
              />
            )
          })
        )}
      </ul>
    </section>
  )
}

export default SavedMoviesCardList
