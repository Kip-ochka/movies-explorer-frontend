import React from 'react'
import './MoviesCard.scss'

function MoviesCard({
  location,
  movieData,
  addToSaveMovie,
  deleteFromSaveMovie,
}) {
  const [data, setData] = React.useState(movieData)
  const [isLiked, setIsLiked] = React.useState(data?.isLiked)
  const handleLike = async () => {
    if (isLiked === false) {
      const dataToValidation = {
        country: data.country,
        description: data.description,
        director: data.director,
        duration: data.duration,
        year: data.year,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameEN: data.nameEN,
        nameRU: data.nameRU,
      }
      try {
        const movie = await addToSaveMovie(dataToValidation)
        setData(movie)
        setIsLiked(true)
      } catch (err) {
        console.log(err)
      }
      return
    }
    if (isLiked === true) {
      await deleteFromSaveMovie(data._id)
      setData(movieData)
      setIsLiked(false)
      return
    }
  }
  const deleted = () => {
    deleteFromSaveMovie(movieData._id)
  }
  return (
    <li className="card">
      <a
        href={data?.trailerLink}
        target="_blank"
        className="card__trailer"
        rel="noreferrer"
      >
        <img src={data?.image} alt="Трейлер фильма" className="card__image" />
      </a>
      <div className="card__title-wrapper">
        <p className="card__title">{data?.nameRU}</p>
        {location === '/movies' ? (
          <button
            className={`card__like ${isLiked && 'card__like_type_active'}`}
            onClick={handleLike}
          />
        ) : (
          <button className={`card__delete`} onClick={deleted} />
        )}
      </div>
      <p className="card__duration">{`${data?.duration} мин`}</p>
    </li>
  )
}

export default MoviesCard
