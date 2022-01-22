import React from 'react';

// styles
import cl from './Form.module.scss';

// components
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';

function Form({ title, btnText, handleSignup, isLoading, values, setValues }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(values.email, values.password);
  };

  return (
    <form className={cl.form} onSubmit={(e) => handleSubmit(e)}>
      <h1 className={cl.title}>{title}</h1>
      {values.error && <span className={cl.error}>{values.error}</span>}
      <div className={cl.inputs}>
        <MyInput
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          type="email"
          placeholder="Email"
        />
        <MyInput
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
      </div>
      <MyButton type="submit" btnColor="blue" disabled={isLoading}>
        {btnText}
      </MyButton>
    </form>
  );
}

export default Form;
