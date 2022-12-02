import React from 'react'
import { Link } from 'react-router-dom'
import account from '../../images/accuont.svg'
import './Navigation.scss'

function Navigation({ isOpen, onClose }) {
  const handleCloseOverlay = (e) => {
    if (e.target.classList.contains('navigation_active')) {
      onClose()
    }
  }
  return (
    <nav
      className={`navigation ${isOpen && 'navigation_active'}`}
      onClick={handleCloseOverlay}
    >
      <div className='navigation__inner'>
        <ul className='navigation__link-list'>
          <li onClick={onClose}>
            <Link className='navigation__film-link navigation__film-link_mobile'>
              Главная
            </Link>
          </li>
          <li onClick={onClose}>
            <Link className='navigation__film-link navigation__film-link_active'>
              Фильмы
            </Link>
          </li>
          <li onClick={onClose}>
            <Link className='navigation__film-link'>Сохраненные фильмы</Link>
          </li>
        </ul>
        <div className='navigation__account-link-wrapper'>
          <Link className='navigation__accoutn-link' onClick={onClose}>
            Аккаунт
            <img
              className='navigation__account-icon'
              src={account}
              alt='icon'
            ></img>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
