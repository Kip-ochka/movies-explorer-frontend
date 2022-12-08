import React from 'react'
import './MoviesCard.scss'

function MoviesCard() {
  return (
    <li className='card'>
      <a href='www.youtube.com' target='_blank' className='card__trailer'>
        <img
          src='https://www.soyuz.ru/public/uploads/files/5/7481412/1005x558_20220415183252fecbaf0ea2.jpg'
          alt='Трейлер фильма'
          className='card__image'
        />
      </a>
      <div className='card__title-wrapper'>
        <p className='card__title'>
          Я рыба я не рыба Я рыба я не рыба Я рыба я не рыба Я рыба я не рыба Я
          рыба я не рыба Я рыба я не рыба
        </p>
        <button className='card__like' />
      </div>
      <p className='card__duration'>1ч 24м</p>
    </li>
  )
}

export default MoviesCard
