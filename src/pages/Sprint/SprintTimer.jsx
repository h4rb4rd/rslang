import React, { useEffect, useState } from 'react';

// styles
import cl from './SprintTimer.module.scss';

function SprintTimer({ secCount, setEnd }) {
  const [seconds, setSeconds] = useState(secCount || 60);
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    } else {
      setEnd(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);
  const setDeg = () => {
    return (360 * seconds) / secCount + 180;
  };
  return (
    <div className={cl.timerWrapper}>
      <div className={`${cl.timer} ${seconds >= secCount / 2 ? cl.over50 : ''}`}>
        <div className={`${cl.side} ${cl.timerLeft}`}> </div>
        <div className={`${cl.side} ${cl.timerRight}`} style={{ '--rotation': setDeg() }}>
          {' '}
        </div>
        <div>
          <div className={cl.timerText}>{seconds}</div>
        </div>
      </div>
    </div>
  );
}

export default SprintTimer;
