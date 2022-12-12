import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import account from '../../images/accuont.svg'
import './Navigation.scss'

function Navigation({ isOpen, onClose }) {
  const handleCloseOverlay = (e) => {
    if (e.target.classList.contains('navigation_active')) {
      onClose()
    }
  }
  const setActiveLink = (navState) => {
    return navState.isActive
      ? 'navigation__film-link navigation__film-link_active'
      : 'navigation__film-link'
  }
  return (
    <nav
      className={`navigation ${isOpen ? 'navigation_active' : ''}`}
      onClick={handleCloseOverlay}
    >
      <div className='navigation__inner'>
        <ul className='navigation__link-list'>
          <li
            onClick={onClose}
            className='navigation__film-link navigation__film-link_mobile'
          >
            <NavLink className={setActiveLink} to='/'>
              Главная
            </NavLink>
          </li>
          <li onClick={onClose}>
            <NavLink className={setActiveLink} to='/movies'>
              Фильмы
            </NavLink>
          </li>
          <li onClick={onClose}>
            <NavLink className={setActiveLink} to='/saved-movies'>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <div className='navigation__account-link-wrapper'>
          <Link
            className='navigation__accoutn-link'
            onClick={onClose}
            to='/profile'
          >
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
