import React from 'react'
import './MoviesCard.scss'

function MoviesCard({
  location,
  movieData,
  addToSaveMovie,
  deleteFromSaveMovie,
}) {
  const [isLiked, setIsLiked] = React.useState(false)
  const [data, setData] = React.useState(movieData)
  const handleLike = async () => {
    if (!isLiked) {
      try {
        const movie = await addToSaveMovie(data)
        setData(movie)
        setIsLiked(true)
      } catch (err) {
        console.log(err)
      }
    }
    if (isLiked) {
      await deleteFromSaveMovie(data._id)
      setData(movieData)
      setIsLiked(false)
    }
  }
  const deleted = () => {
    deleteFromSaveMovie(movieData._id)
  }

  return (
    <li className="card">
      <a
        href={data.trailerLink}
        target="_blank"
        className="card__trailer"
        rel="noreferrer"
      >
        <img src={data.image} alt="Трейлер фильма" className="card__image" />
      </a>
      <div className="card__title-wrapper">
        <p className="card__title">{data.nameRU}</p>
        {location === '/movies' ? (
          <button
            className={`card__like ${isLiked && 'card__like_type_active'}`}
            onClick={handleLike}
          />
        ) : (
          <button className={`card__delete`} onClick={deleted} />
        )}
      </div>
      <p className="card__duration">{`${data.duration} мин`}</p>
    </li>
  )
}

export default MoviesCard
