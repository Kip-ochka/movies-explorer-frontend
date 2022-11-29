import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../images/logo.svg'
function Header() {
  return (
    <header className='header'>
      <div className='header__inner'>
        <Link to='/'>
          <Logo className='header__logo' />
        </Link>
        <div className='header__wrapper'>
          <Link className='header__link header__link_type_signup'>
            <p className='header__text'>Регистрация</p>
          </Link>
          <Link className='header__link header__link_type_signin'>
            <p className='header__text'>Войти</p>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
