import React from 'react'
import AuthPage from '../AuthPage/AuthPage'
import FormInput from '../FormInput/FormInput'
import { useFormAndValidation } from '../../utils/hooks/useFormAndValidation'

function Login() {
  const content = {
    title: 'Рады видеть!',
    buttonText: 'Войти',
    captionText: 'Ещё не зарегистрированы?',
    linkText: 'Регистрация',
    path: '/signup',
  }

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  } = useFormAndValidation()

  React.useEffect(() => {
    resetForm()
  }, [])

  return (
    <AuthPage content={content} isValid={isValid}>
      <FormInput
        label='E-mail'
        type='email'
        name='email'
        values={values.email}
        handleChange={handleChange}
        errors={errors.email}
        isValid={isValid}
      />
      <FormInput
        label='Пароль'
        type='password'
        name='password'
        values={values.password}
        handleChange={handleChange}
        errors={errors.password}
        isValid={isValid}
      />
    </AuthPage>
  )
}

export default Login
