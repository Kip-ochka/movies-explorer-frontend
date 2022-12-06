import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import './Profile.scss'
function Profile() {
  const [isRedacted, setIsRedacted] = React.useState(false)
  const handleRedacted = () => {
    setIsRedacted((v) => !v)
  }
  const handleExit = (evt) => {
    evt.preventDefault()
  }
  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__title'>Привет, Игорь!</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <label className='profile__input-wrapper'>
              <span className='profile__label'>Имя</span>
              <input
                className='profile__input'
                value={'Игорь'}
                type='text'
                readOnly
              />
            </label>
            <div className='profile__dash'></div>
            <label className='profile__input-wrapper'>
              <span className='profile__label'>E-mail</span>
              <input
                className='profile__input'
                value={'Email@email.ru'}
                type='email'
                readOnly
              />
            </label>
          </fieldset>
          <div className='profile__redacted-wrapper'>
            <span className='profile__error profile__error_active'>
              {'error'}
            </span>
            {isRedacted ? (
              <button
                onClick={handleRedacted}
                className='profile__redact-button'
                type='submit'
              >
                Сохранить
              </button>
            ) : (
              <div className='profile__button-wrapper'>
                <button className='profile__redacted' onClick={handleRedacted}>
                  Редактировать
                </button>
                <button className='profile__exit' onClick={handleExit}>
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile
