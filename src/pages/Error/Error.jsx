import React from 'react';

// styles
import cl from './Error.module.scss';

function Error() {
  return (
    <div className={cl.error}>
      <h2 className={cl.title}>Page Not Found</h2>
      <p className={cl.text}>We can&apos;t find the page you&apos;re looking for.</p>
    </div>
  );
}

export default Error;
