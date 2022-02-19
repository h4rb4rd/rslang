import React from 'react';

// styles
import cl from './MyModal.module.scss';

function MyModal({ children, isVisible, setIsVisible }) {
  const classes = [cl.modal];

  if (isVisible) {
    classes.push(cl.active);
  }

  return (
    <div
      className={classes.join(' ')}
      role="button"
      onClick={() => setIsVisible(false)}
      onKeyDown={() => setIsVisible(false)}
      tabIndex={0}
    >
      <div
        className={cl.content}
        role="button"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModal;
