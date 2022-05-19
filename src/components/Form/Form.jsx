import React, { useState, useEffect } from 'react';

// styles
import cl from './Form.module.scss';

// components
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';

function Form({
  formType,
  title,
  btnText,
  usernameInput,
  emailInput,
  passwordInput,
  isLoading,
  authError,
  validError,
  isInputEmpty,
  handleSubmit,
}) {
  const [isDisabled, setIsDisabled] = useState(true);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (formType === 'login') {
      handleSubmit(emailInput.value, passwordInput.value);
    }

    if (formType === 'signup') {
      handleSubmit(usernameInput.value, emailInput.value, passwordInput.value);
    }
  };

  useEffect(() => {
    if (isLoading || validError || !isInputEmpty) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isLoading, validError, isInputEmpty]);

  return (
    <form className={cl.form} onSubmit={(e) => onHandleSubmit(e)}>
      <h1 className={cl.title}>{title}</h1>
      {authError && <span className={cl.error}>{authError}</span>}
      <div className={cl.inputs}>
        {formType === 'signup' && (
          <MyInput
            name="username"
            value={usernameInput.value}
            onChange={(e) => usernameInput.onChange(e)}
            onBlur={(e) => usernameInput.onBlur(e)}
            type="text"
            placeholder="Имя пользователя:"
            error={usernameInput.isDirty && usernameInput.error}
          />
        )}
        <MyInput
          name="email"
          value={emailInput.value}
          onChange={(e) => emailInput.onChange(e)}
          onBlur={(e) => emailInput.onBlur(e)}
          type="email"
          placeholder="Почта:"
          error={emailInput.isDirty && emailInput.error}
        />
        <MyInput
          name="password"
          value={passwordInput.value}
          onChange={(e) => passwordInput.onChange(e)}
          onBlur={(e) => passwordInput.onBlur(e)}
          type="password"
          placeholder="Пароль:"
          error={passwordInput.isDirty && passwordInput.error}
        />
      </div>
      <MyButton type="submit" btnColor="blue" disabled={isDisabled}>
        {btnText}
      </MyButton>
    </form>
  );
}

export default Form;
