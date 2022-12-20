import React from 'react'
import './MoviesCard.scss'

function MoviesCard({ location, movieData }) {
  const [isLiked, setIsLiked] = React.useState(false)
  const handleLike = () => {
    setIsLiked((v) => !v)
  }

  return (
    <li className="card">
      <a
        href={movieData.trailerLink}
        target="_blank"
        className="card__trailer"
        rel="noreferrer"
      >
        <img
          src={movieData.image}
          alt="Трейлер фильма"
          className="card__image"
        />
      </a>
      <div className="card__title-wrapper">
        <p className="card__title">{movieData.nameRU}</p>
        {location === '/movies' ? (
          <button
            className={`card__like ${isLiked && 'card__like_type_active'}`}
            onClick={handleLike}
          />
        ) : (
          <button className={`card__delete`} />
        )}
      </div>
      <p className="card__duration">{`${movieData.duration} мин`}</p>
    </li>
  )
}

export default MoviesCard
