import { useEffect, useState } from 'react';

const emailRe = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[+-_@$!%*?&#.,;:{}]).{8,}$/;

const useValidation = (value, type) => {
  const [validationError, setValidationError] = useState('');
  const isEmailValid = emailRe.test(String(value.toLowerCase()));
  const isPasswordValid = passwordRe.test(value);

  useEffect(() => {
    switch (type) {
      case 'username':
        if (!value) {
          setValidationError('Поле "Имя пользователя" не может быть пустым!');
        } else if (value.length < 4) {
          setValidationError('Имя пользователя не может быть короче 4 символов');
        } else {
          setValidationError('');
        }
        break;
      case 'email':
        if (!value) {
          setValidationError('Поле "Почта" не может быть пустым!');
        } else if (!isEmailValid) {
          setValidationError('Введите корретный адрес почты!');
        } else {
          setValidationError('');
        }
        break;
      case 'password':
        if (!value) {
          setValidationError('Поле "Пароль" не может быть пустым!');
        } else if (value.length < 8) {
          setValidationError('Паоль не может быть короче 8 символов');
        } else if (!isPasswordValid) {
          setValidationError(
            'Пароль должен содержать спец символ, цифру, прописную и заглавную букву'
          );
        } else {
          setValidationError('');
        }
        break;
      default:
        break;
    }
  }, [value]);

  return validationError;
};

export default useValidation;
