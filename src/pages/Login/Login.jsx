import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signup, login } from '../../utils/firebase';
// styles
import cl from './Login.module.scss';

// components
import MyButton from '../../components/UI/MyButton/MyButton';
import Form from '../../components/Form';
import Logo from '../../components/Logo/Logo';

function Login() {
  const [formType, setformType] = useState('login');
  const [signFormValues, setSignFormValues] = useState({ email: '', password: '', error: '' });
  const [loginFormValues, setLoginFormValues] = useState({ email: '', password: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormType = () => {
    return formType === 'login' ? setformType('register') : setformType('login');
  };

  const handleSignup = async (email, password) => {
    setIsLoading(true);

    try {
      await signup(email, password);
    } catch (err) {
      const message = err.code.replace('auth/', '').split('-').join(' ');
      setSignFormValues({ ...signFormValues, error: message });
    }

    setIsLoading(false);
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      const message = err.code.replace('auth/', '').split('-').join(' ');
      setLoginFormValues({ ...signFormValues, error: message });
    }

    setIsLoading(false);
  };

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
          title="Войти"
          btnText="Войти"
          isLoading={isLoading}
          values={loginFormValues}
          handleSignup={handleLogin}
          setValues={setLoginFormValues}
        />
      ) : (
        <Form
          title="Создайте аккаунт"
          btnText="Создать аккаунт"
          isLoading={isLoading}
          values={signFormValues}
          handleSignup={handleSignup}
          setValues={setSignFormValues}
        />
      )}
      <div className={cl.promo}>
        <Link to="/about">О проекте</Link>
      </div>
    </div>
  );
}

export default Login;
