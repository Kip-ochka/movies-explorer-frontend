import React from 'react'
import AuthPage from '../AuthPage/AuthPage'
import FormInput from '../FormInput/FormInput'

function Register() {
  const content = {
    title: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    captionText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    path: '/signin',
  }
  const inputsData = [
    { inputLabel: 'Имя', type: 'text', error: 'error', errorStatus: false },
    { inputLabel: 'E-mail', type: 'email', error: 'error', errorStatus: false },
    {
      inputLabel: 'Пароль',
      type: 'password',
      error: 'error',
      errorStatus: true,
    },
  ]
  return (
    <AuthPage content={content}>
      {inputsData.map((inputData, index) => {
        return <FormInput inputData={inputData} key={index} />
      })}
    </AuthPage>
  )
}

export default Register
