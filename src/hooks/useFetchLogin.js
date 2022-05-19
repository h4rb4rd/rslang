import { useState, useContext } from 'react';
import AuthContext from '../context';

const useFetchLogin = (callback) => {
  const [isLoginFetching, setIsLoginFetching] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const fetching = async (email, password) => {
    try {
      setIsLoginFetching(true);

      const response = await callback(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userId', response.data.userId);

      setIsAuth(true);
    } catch (err) {
      if (err.response.status === 404) {
        setLoginError('Пользователь не найден!');
      }
      if (err.response.status === 403) {
        setLoginError('Неверная почта или пароль!');
      }
    } finally {
      setIsLoginFetching(false);
    }
  };

  return [fetching, isLoginFetching, loginError];
};

export default useFetchLogin;
