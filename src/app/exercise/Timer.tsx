import { useEffect, useState } from "react";

const SECOND = 1000;

interface TimerProps {
  countdown: number
}

const Timer: React.FC<TimerProps>  = ({
  countdown
}) => {
    const [seconds, setSeconds] = useState(countdown/SECOND);

    useEffect(() => {
        const interval = setInterval(
            () => setSeconds(prevSeconds => {
              return prevSeconds - 1
            }),
            SECOND,
        );

        return () => clearInterval(interval);
    }, []);

    return (
      <div className="timer">
        <div className="box">
            <p>{`${Math.floor(seconds)}`}</p>
            <span className="text">Seconds</span>
        </div>
      </div>
    );
};

export default Timer;