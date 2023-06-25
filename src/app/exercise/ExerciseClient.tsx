'use client';

import { useState, useRef } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

// import Image from 'next/image';
import Countdown, { CountdownApi } from 'react-countdown';
import { Exercise } from '../../types/types';

interface ExerciseProps {
  exercises: Exercise[];
}

const INITIAL_TIMER_DURATION = 5000;

const ExerciseClient: React.FC<ExerciseProps> = ({ exercises }) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [date, setDate] = useState(Date.now() + INITIAL_TIMER_DURATION);
  const [isBreak, setIsBreak] = useState(true);
  const [isTimerStarted, setIsTimerStarted] = useState(true);
  let countdownApi: CountdownApi | null = null;

  const youtubeRef: YouTubePlayer = useRef(null);

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const handleStartPause = (): void => {
    if (countdownApi && countdownApi.isStarted()) {
      countdownApi.pause();
      setIsTimerStarted(false);
    }
    if (countdownApi && countdownApi.isPaused()) {
      countdownApi.start();
      setIsTimerStarted(true);
    }
  };

  const handlePrev = () => {
    setExerciseIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  };

  const handleNext = () => {
    setExerciseIndex((prevIndex) => {
      return prevIndex < exercises.length - 1 ? prevIndex + 1 : prevIndex;
    });
  };

  const handleTimerComplete = () => {
    // TODO: play sound
    console.log('countdownApi?.isCompleted', countdownApi?.isCompleted);
    if (countdownApi?.isCompleted) {
      console.log('isBreak: ', isBreak);
      if (isBreak) {
        setIsBreak(false);
        setDate(Date.now() + exercises[exerciseIndex].length);
        youtubeRef?.current?.playVideo();
      } else {
        setIsBreak(true);
        console.log('length: ', exercises[exerciseIndex].length);
        setDate(Date.now() + INITIAL_TIMER_DURATION);
        handleNext();
      }
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '310',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      mute: 1,
      modestbranding: 1,
    },
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    youtubeRef.current = event.target;
    event.target.mute();
  };

  const onPlayerEnd: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
  };

  return (
    <>
      {/* <Image
        src={`/${exercises[exerciseIndex].image}.png`}
        alt="Picture of the exercise"
        width={320} //automatically provided
        height={320} //automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      /> */}
      <YouTube
        videoId={exercises[exerciseIndex].videoId}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={onPlayerEnd}
      />
      <div>{exercises[exerciseIndex].name}</div>
      {/* <div>{exercises[exerciseIndex].description}</div> */}
      <Countdown
        ref={setRef}
        key={date}
        date={date}
        renderer={(props) => (
          <span className="countdown font-mono text-4xl">
            <span
              id="countdownElement"
              style={{ '--value': props.seconds } as React.CSSProperties}
            ></span>
          </span>
        )}
        onComplete={handleTimerComplete}
      />
      <div>
        <button className="btn-square btn" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            stroke="currentColor"
          >
            <path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" />
          </svg>
        </button>
        <button className="btn-square btn" onClick={handleStartPause}>
          {isTimerStarted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
            >
              <path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0ZM8,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z" />
              <path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0ZM19,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
            >
              <path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z" />
            </svg>
          )}
        </button>
        <button className="btn-square btn" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            stroke="currentColor"
          >
            <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ExerciseClient;
