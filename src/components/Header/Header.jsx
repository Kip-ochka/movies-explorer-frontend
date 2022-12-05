import './Header.scss'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation'

function Header({ isLogin }) {
  const lokation = useLocation()
  const isMainLokation = lokation.pathname === '/'
  const [burgerIsOpen, setBurgerIsOpen] = React.useState(false)

  const handleCloseBurger = () => {
    setBurgerIsOpen(false)
  }
  const toggleBurgerButton = () => {
    if (burgerIsOpen) {
      setBurgerIsOpen(false)
    } else {
      setBurgerIsOpen(true)
    }
  }
  return (
    <header className={isMainLokation ? 'header' : 'header header_type_black'}>
      <div className='header__inner'>
        <Link to='/'>
          <Logo className='header__logo' />
        </Link>
        {isLogin ? (
          <>
            <button
              className={`header__button ${
                burgerIsOpen && 'header__button_opened'
              }`}
              onClick={toggleBurgerButton}
            />
            <Navigation isOpen={burgerIsOpen} onClose={handleCloseBurger} />
          </>
        ) : (
          <div className='header__wrapper'>
            <Link
              className='header__link header__link_type_signup'
              to='/signup'
            >
              <p className='header__text'>Регистрация</p>
            </Link>
            <Link
              className='header__link header__link_type_signin'
              to='/signin'
            >
              <p className='header__text'>Войти</p>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
