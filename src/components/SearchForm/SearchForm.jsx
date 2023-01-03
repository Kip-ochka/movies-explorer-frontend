import React from 'react'
import './SearchForm.scss'
import { ReactComponent as Loop } from '../../images/loopa.svg'

function SearchForm({
  validationMessage,
  inputValues,
  isChecked,
  isDisabled,
  handleCheck,
  handleSubmit,
  handleChange,
}) {
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
              value={inputValues}
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
