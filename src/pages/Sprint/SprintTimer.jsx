import React, { useEffect, useState } from 'react';

// styles
import cl from './SprintTimer.module.scss';

function SprintTimer({ secCount }) {
  const [seconds, setSeconds] = useState(secCount || 60);
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);
  //   const setValue = ()=>{
  //     let deg = (360 * seconds / secCount) + 180;
  //     if(value >= this.maxValue / 2){
  //         this.node.classList.add('over_50');
  //     }else{
  //         this.node.classList.remove('over_50');
  //     }

  //     this.timerRight.style.setProperty('--rotation', deg);
  //     this.timerText.innerText = value;
  // }
  return (
    <div className={cl.timerWrapper}>
      <div className={`${cl.timer} ${cl.over50}`}>
        <div className={`${cl.side} ${cl.timerLeft}`}> </div>
        <div className={`${cl.side} ${cl.timerRight}`}> </div>
        <div>
          <div className={cl.timerText}>{seconds}</div>
        </div>
      </div>
    </div>
  );
}

export default SprintTimer;
