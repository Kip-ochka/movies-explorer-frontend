import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../images/logo.svg'
import './AuthPage.scss'

function AuthPage({ content, children }) {
  const { title, buttonText, captionText, linkText, path } = content
  const handleSubmit = (evt) => {
    evt.preventDefault()
  }
  return (
    <main className='auth'>
      <div className='auth__inner'>
        <Link to='/' className='auth__navigate-link'>
          <Logo className='auth__logo' />
        </Link>
        <h1 className='auth__title'>{title}</h1>
        <form className='auth__form' onSubmit={handleSubmit}>
          <fieldset className='auth__fieldset'>{children}</fieldset>
          <div className='auth__button-wrapper'>
            <span className='auth__error auth__error_active'>Ошибка!</span>
            <button
              className='auth__button-submit auth__button-submit_disable'
              type='submit'
            >
              {buttonText}
            </button>
          </div>
          <div className='auth__caption-wrapper'>
            <p className='auth__caption-text'>{captionText}</p>
            <Link className='auth__link' to={path}>
              {linkText}
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AuthPage
