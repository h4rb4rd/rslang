import React from 'react';

// styles
import cl from './PopUp.module.scss';

function PopUp({ children, posX, posY, isVisible }) {
  const classes = [cl.popup];
  if (isVisible) {
    classes.push(cl.active);
  }

  return (
    <div style={{ top: posY || 0, left: posX || 0 }} className={classes.join(' ')}>
      {children}
    </div>
  );
}

export default PopUp;
