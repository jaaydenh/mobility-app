import { useEffect, useState } from 'react';

const useCountdown = () => {
  const [id, setId] = useState<NodeJS.Timer>();
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   let interval: number | null = null;
  //   if (isActive) {
  //     const interval = setInterval(() => {
  //       console.log({seconds});
  //       setCountDown(prevSeconds => prevSeconds - 1);
  //     }, 1000);
  //   } else if (!isActive && countDown !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, countDown, seconds]);

  const start = (durationInSecs: number) => {
    if (isActive === true) {
      throw new Error('Timer already running');
    }

    if (!durationInSecs) {
      throw new Error('Invalid duration');
    }

    try {
      let timer = durationInSecs;

      const thisId = setInterval(() => {
        setCountdown(timer);
        
        if (--timer < 0) {
          console.log('cleareeededed')
          clear();
        }
      }, 1000);
      setId(thisId);
      console.log('id: ', id);
      setIsActive(true);
      return {};
    } catch (error) {
      return {};
    }
  }

  const clear = () => {
    console.log('id: ', id);
    console.log('isActive: ', isActive);
    if (!isActive) {
      return false;
    }

    clearInterval(id);
    setIsActive(false);
    setId(undefined);
    setCountdown(0);

    return {};
  }


  return { start, clear, countdown, isActive };
};

export { useCountdown };
