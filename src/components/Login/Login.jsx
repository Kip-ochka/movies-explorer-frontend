import React from 'react'
import AuthPage from '../AuthPage/AuthPage'
import FormInput from '../FormInput/FormInput'

function Login() {
  const content = {
    title: 'Рады видеть!',
    buttonText: 'Войти',
    captionText: 'Ещё не зарегистрированы?',
    linkText: 'Регистрация',
    path: '/signup',
  }
  const inputsData = [
    { inputLabel: 'E-mail', type: 'email', error: 'error' },
    { inputLabel: 'Пароль', type: 'password', error: 'error' },
  ]
  return (
    <AuthPage content={content}>
      {inputsData.map((inputData, index) => {
        return <FormInput inputData={inputData} key={index} />
      })}
    </AuthPage>
  )
}

export default Login
