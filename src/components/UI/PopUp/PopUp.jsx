import React from 'react';

// styles
import cl from './PopUp.module.scss';

function PopUp({ children, width, height, posX, posY, isVisible }) {
  const classes = [cl.popup];
  if (isVisible) {
    classes.push(cl.active);
  }

  return (
    <div
      style={{ width: width || 'auto', height: height || 'auto', top: posY || 0, left: posX || 0 }}
      className={classes.join(' ')}
    >
      {children}
    </div>
  );
}

export default PopUp;
