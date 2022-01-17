import React from 'react';

// styles
import cl from './MyInput.module.scss';

function MyInput(props) {
  return <input className={cl.input} {...props} />;
}

export default MyInput;
