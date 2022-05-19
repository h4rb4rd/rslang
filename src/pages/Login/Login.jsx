import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import cl from './Login.module.scss';

// components
import MyButton from '../../components/UI/MyButton/MyButton';
import Form from '../../components/Form';
import Logo from '../../components/Logo/Logo';

// ***********
import ApiSerives from '../../services/ApiService';
import useFetchLogin from '../../hooks/useFetchLogin';
import useFetchSignup from '../../hooks/useFetchSignup';
import useInput from '../../hooks/useInput';

function Login() {
  const [formType, setformType] = useState('login');
  const usernameSignupInput = useInput('', 'username');
  const emailSignupInput = useInput('', 'email');
  const passwordSignupInput = useInput('', 'password');

  const emailLoginInput = useInput('', 'email');
  const passwordLoginInput = useInput('', 'password');

  const signupnValidateError =
    usernameSignupInput.error || emailSignupInput.error || passwordSignupInput.error;

  const loginValidateError = emailLoginInput.error || passwordLoginInput.error;

  const isSignupInputEmpty =
    usernameSignupInput.value && emailSignupInput.value && passwordSignupInput.value;
  const isLoginInputEmpty = emailLoginInput.value && passwordLoginInput.value;

  const toggleFormType = () =>
    formType === 'login' ? setformType('singup') : setformType('login');

  // signup
  const [fetchSignup, isSignupFetching, signupError] = useFetchSignup(
    async (name, email, password) => ApiSerives.signup(name, email, password)
  );

  // login
  const [fetchLogin, isLoginFetching, loginError] = useFetchLogin(async (email, password) =>
    ApiSerives.login(email, password)
  );

  return (
    <div className={cl.login}>
      <div className={cl.registration}>
        <MyButton onClick={toggleFormType} type="button">
          {formType === 'login' ? 'Регистрация' : 'Войти'}
        </MyButton>
      </div>
      <div className={cl.logo}>
        <Logo />
      </div>
      {formType === 'login' ? (
        <Form
          formType="login"
          title="Войти"
          btnText="Войти"
          emailInput={emailLoginInput}
          passwordInput={passwordLoginInput}
          isLoading={isLoginFetching}
          authError={loginError}
          validError={loginValidateError}
          isInputEmpty={isLoginInputEmpty}
          handleSubmit={fetchLogin}
        />
      ) : (
        <Form
          formType="signup"
          title="Создайте аккаунт"
          btnText="Создать аккаунт"
          usernameInput={usernameSignupInput}
          emailInput={emailSignupInput}
          passwordInput={passwordSignupInput}
          isLoading={isSignupFetching}
          authError={signupError}
          validError={signupnValidateError}
          isInputEmpty={isSignupInputEmpty}
          handleSubmit={fetchSignup}
        />
      )}
      <div className={cl.promo}>
        <Link to="/about">&#10006;</Link>
      </div>
    </div>
  );
}

export default Login;
