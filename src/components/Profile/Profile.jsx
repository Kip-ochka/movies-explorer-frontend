import React from 'react'
import { CurrentUserContext } from '../../context/CurrenUser'
import { useFormAndValidation } from '../../utils/hooks/useFormAndValidation'
import { EMAIL_PATTERN } from '../../utils/variables'
import './Profile.scss'

function Profile({ handleLogout, handleUpdateUserInfo, message, isError }) {
  const [isMatch, setIsMatch] = React.useState(true)
  const currentUser = React.useContext(CurrentUserContext)
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  } = useFormAndValidation()

  const handleRedacted = (evt) => {
    evt.preventDefault()
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      console.log('ok')
    } else {
      handleUpdateUserInfo(values)
    }
  }
  const handleExit = (evt) => {
    evt.preventDefault()
    handleLogout()
  }

  React.useEffect(() => {
    resetForm({ name: currentUser?.name, email: currentUser?.email })
  }, [currentUser])

  return (
    <main className="profile">
      <div className="profile__inner">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <label className="profile__input-wrapper">
              <span className="profile__input-error profile__input-error_type_top">
                {errors.name}
              </span>
              <span className="profile__label">Имя</span>
              <input
                className="profile__input"
                value={values.name || ''}
                type="text"
                onChange={handleChange}
                name="name"
                required
                minLength="2"
              />
            </label>
            <div className="profile__dash"></div>
            <label className="profile__input-wrapper">
              <span className="profile__label">E-mail</span>
              <input
                className="profile__input"
                value={values.email || ''}
                type="email"
                onChange={handleChange}
                name="email"
                required
                pattern={EMAIL_PATTERN}
              />
              <span className="profile__input-error profile__input-error_type_bot">
                {errors.email}
              </span>
            </label>
          </fieldset>
          <div className="profile__redacted-wrapper">
            <span
              className={`profile__error ${
                isError ? '' : 'profile__error_noterror'
              }`}
            >
              {message}
            </span>
            <div className="profile__button-wrapper">
              <button
                className="profile__redacted"
                onClick={handleRedacted}
                type="submit"
                disabled={!isValid}
              >
                Редактировать
              </button>
              <button className="profile__exit" onClick={handleExit}>
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile
