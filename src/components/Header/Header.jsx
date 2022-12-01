import './Header.scss'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../images/logo.svg'
import account from '../../images/guard.jpg'
function Header({ isLogin }) {
  const lokation = useLocation()
  const isMainLokation = lokation.pathname === '/'

  return (
    <header className={isMainLokation ? 'header' : 'header header_type_black'}>
      <div className='header__inner'>
        <Link to='/'>
          <Logo className='header__logo' />
        </Link>
        {isLogin && <button className='header__button' />}
        {isLogin ? (
          <div className='header__account-wrapper'>
            <div className='header__inner-wrapper'>
              <Link className='header__film-link header__film-link_active'>
                Фильмы
              </Link>
              <Link className='header__film-link'>Сохраненные фильмы</Link>
            </div>
            <div className='header__inner-wrapper'>
              <Link className='header__accoutn-link-'>
                Аккаунт
                <img
                  className='header__account-icon'
                  src={account}
                  alt='icon'
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className='header__wrapper'>
            <Link className='header__link header__link_type_signup'>
              <p className='header__text'>Регистрация</p>
            </Link>
            <Link className='header__link header__link_type_signin'>
              <p className='header__text'>Войти</p>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
