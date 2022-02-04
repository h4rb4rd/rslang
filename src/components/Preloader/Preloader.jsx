import React from 'react';

// styles
import cl from './Preloader.module.scss';

import preloader from '../../assets/preloader.svg';

function Preloader() {
  return (
    <div className={cl.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  );
}

export default Preloader;
