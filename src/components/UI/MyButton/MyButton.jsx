import React from 'react';

// styles
import cl from './MyButton.module.scss';

function MyButton({ children, btnColor, ...props }) {
  const classes = [cl.button];

  if (btnColor === 'blue') {
    classes.push(cl.blue);
  }

  if (btnColor === 'green') {
    classes.push(cl.green);
  }

  return (
    <div className={cl.container}>
      <button className={classes.join(' ')} {...props}>
        {children}
      </button>
    </div>
  );
}

export default MyButton;
