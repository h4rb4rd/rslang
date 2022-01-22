import React from 'react';

// styles
import cl from './Avatar.module.scss';

import avatar from '../../assets/ava/ava.svg';

function Avatar() {
  return (
    <div className={cl.avatar}>
      <img className={cl.image} src={avatar} alt="avatar" />
    </div>
  );
}

export default Avatar;
