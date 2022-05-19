import React from 'react';

// styles
import cl from './MyInput.module.scss';

function MyInput({ error, ...rest }) {
  return (
    <div className={cl.container}>
      <input className={cl.input} {...rest} />
      {error && <span className={cl.error}>{error}</span>}
    </div>
  );
}

export default MyInput;
