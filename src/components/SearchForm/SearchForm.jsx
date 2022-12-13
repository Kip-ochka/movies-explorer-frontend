import React from 'react'
import './SearchForm.scss'
import { ReactComponent as Loop } from '../../images/loopa.svg'

function SearchForm() {
  const [isChecked, setIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)
  const handleCheck = () => {
    setIsChecked((v) => !v)
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled((v) => !v)
    }, 500)
  }
  return (
    <form className='search'>
      <div className='search__inner'>
        <fieldset className='search__fieldset'>
          <div className='search__input-wrapper'>
            <Loop className='search__loop-icon' />
            <input type='text' className='search__input' placeholder='Фильм' />
            <button className='search__submit' type='submit' />
            <div className='search__dash'></div>
          </div>
        </fieldset>
        <div className='search__checkbox-wrapper'>
          <input
            type='checkbox'
            className='search__checkbox'
            checked={isChecked}
            onChange={handleCheck}
            disabled={isDisabled}
            required
          />
          <span className='search__checkbox-discription'>Короткометражки</span>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
