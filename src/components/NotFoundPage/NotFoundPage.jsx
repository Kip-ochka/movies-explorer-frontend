import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NotFoundPage.scss'
function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='not-found'>
      <div className='not-found__inner'>
        <h4 className='not-found__title'>404</h4>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <Link
        className='not-found__button'
        onClick={() => {
          navigate(-1)
        }}
      >
        Назад
      </Link>
    </div>
  )
}

export default NotFoundPage
