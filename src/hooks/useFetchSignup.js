import { useState, useContext } from 'react';
import ApiSerives from '../services/ApiService';
import AuthContext from '../context';

const useFetchSignup = (callback) => {
  const [isSignupFetching, setIsSignupFetching] = useState(false);
  const [signupError, setSignupError] = useState('');
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const fetching = async (name, email, password) => {
    try {
      setIsSignupFetching(true);
      await callback(name, email, password);

      ApiSerives.login(email, password).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userId', response.data.userId);
        setIsAuth(true);
      });
    } catch (err) {
      setSignupError(err.message);
      if (err.response.status === 422) {
        setSignupError('Неверная почта или пароль!');
      }
      if (err.response.status === 417) {
        setSignupError('Пользователь с такой почтой уже существует!');
      }
    } finally {
      setIsSignupFetching(false);
    }
  };

  return [fetching, isSignupFetching, signupError];
};

export default useFetchSignup;
