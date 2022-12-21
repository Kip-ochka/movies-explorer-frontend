import React from 'react'
import './SearchForm.scss'
import { ReactComponent as Loop } from '../../images/loopa.svg'

function SearchForm({ sliceFilms, filterCheckbox }) {
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isChecked, setIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const handleCheck = () => {
    setIsChecked((v) => !v)
    filterCheckbox(isChecked)
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled((v) => !v)
    }, 500)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!inputValue) {
      setValidationMessage('Нужно ввести ключевое слово')
    }

    sliceFilms(isChecked, inputValue)
  }

  const handleChange = (evt) => {
    if (!inputValue) {
      setValidationMessage('')
    }
    setInputValue(evt.target.value)
  }

  React.useEffect(() => {
    const checked = JSON.parse(localStorage.getItem('isChecked'))
    const inputValue = localStorage.getItem('inputValue')

    if (checked) {
      setIsChecked(checked)
    }
    if (inputValue) {
      setInputValue(inputValue)
    }
    return
  }, [])

  return (
    <form className="search" required onSubmit={handleSubmit}>
      <span className="search__error">{validationMessage}</span>
      <div className="search__inner">
        <fieldset className="search__fieldset">
          <div className="search__input-wrapper">
            <Loop className="search__loop-icon" />
            <input
              type="text"
              className="search__input"
              placeholder="Фильм"
              value={inputValue}
              onChange={handleChange}
            />
            <button className="search__submit" type="submit" />
            <div className="search__dash"></div>
          </div>
        </fieldset>
        <div className="search__checkbox-wrapper">
          <input
            id="short-movies"
            type="checkbox"
            className="search__checkbox"
            checked={isChecked}
            onChange={handleCheck}
            disabled={isDisabled}
          />
          <label
            htmlFor="short-movies"
            className="search__checkbox-discription"
          >
            Короткометражки
          </label>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
