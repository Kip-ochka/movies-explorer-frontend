import React from 'react'
import './MoviesCard.scss'

function MoviesCard({ location }) {
  const [isLiked, setIsLiked] = React.useState(false)
  const handleLike = () => {
    setIsLiked((v) => !v)
  }

  return (
    <li className='card'>
      <a
        href='https://www.youtube.com/watch?v=iYMoLgSlSKQ&t=2s'
        target='_blank'
        className='card__trailer'
        rel='noreferrer'
      >
        <img
          src='https://www.soyuz.ru/public/uploads/files/5/7481412/1005x558_20220415183252fecbaf0ea2.jpg'
          alt='Трейлер фильма'
          className='card__image'
        />
      </a>
      <div className='card__title-wrapper'>
        <p className='card__title'>Я рыба я не рыба а рыба фыв фыв </p>
        {location === '/movies' ? (
          <button
            className={`card__like ${isLiked && 'card__like_type_active'}`}
            onClick={handleLike}
          />
        ) : (
          <button className={`card__delete`} />
        )}
      </div>
      <p className='card__duration'>1ч 24м</p>
    </li>
  )
}

export default MoviesCard
