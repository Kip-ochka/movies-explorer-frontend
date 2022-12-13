import React from 'react'
import AuthPage from '../AuthPage/AuthPage'
import FormInput from '../FormInput/FormInput'
import { useFormAndValidation } from '../../utils/hooks/useFormAndValidation'
import { EMAIL_PATTERN } from '../../utils/variables'

function Register() {
  const content = {
    title: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    captionText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    path: '/signin',
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
        label='Имя'
        type='name'
        name='name'
        values={values.name}
        handleChange={handleChange}
        errors={errors.name}
        isValid={isValid}
      />
      <FormInput
        label='E-mail'
        type='email'
        name='email'
        values={values.email}
        handleChange={handleChange}
        errors={errors.email}
        isValid={isValid}
        pattern={EMAIL_PATTERN}
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

export default Register
