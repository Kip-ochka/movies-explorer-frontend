import React from 'react'
import './FormInput.scss'
function FormInput({
  label,
  type,
  name,
  values,
  handleChange,
  errors,
  isValid,
  ...restProp
}) {
  return (
    <div className='form-input'>
      <label className='form-input__label'>{label}</label>
      <input
        className={`form-input__input ${
          isValid ? '' : 'form-input__input_error'
        }`}
        type={type}
        required
        minLength='2'
        name={name}
        value={values || ''}
        onChange={handleChange}
        {...restProp}
      />
      <span
        className={`form-input__error ${
          isValid ? '' : 'form-input__error_active'
        }`}
      >
        {errors}
      </span>
    </div>
  )
}

export default FormInput
