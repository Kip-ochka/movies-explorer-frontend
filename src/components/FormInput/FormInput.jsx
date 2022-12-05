import React from 'react'
import './FormInput.scss'
function FormInput({ inputData }) {
  const { inputLabel, type, error, errorStatus } = inputData
  return (
    <div className='form-input'>
      <label className='form-input__label'>{inputLabel}</label>
      <input
        className={`form-input__input ${
          errorStatus && 'form-input__input_error'
        }`}
        type={type}
      />
      <span
        className={`form-input__error ${
          errorStatus && 'form-input__error_active'
        }`}
      >
        {error}
      </span>
    </div>
  )
}

export default FormInput
