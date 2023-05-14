'use client'

import { useState } from 'react'
import Image from 'next/image'

import Timer from './Timer'
import { Exercise } from '../../types/types'

interface ExerciseProps {
  exercises: Exercise[]
}

const ExerciseClient: React.FC<ExerciseProps> = ({
  exercises
}) => {
  const [ exerciseIndex, setExerciseIndex ] = useState(0);
  console.log({exercises});
  return (
    <>
      <div>Exercise</div>
      <Image
          src={`/${exercises[exerciseIndex].image}.png`}
          alt="Picture of the exercise"
          width={180} //automatically provided
          height={180} //automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      <div>{exercises[exerciseIndex].name}</div>
      <div>{exercises[exerciseIndex].description}</div>
      <Timer countdown={30000}></Timer>
      <div>
        <button className="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" stroke="currentColor"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>
        </button>
        <button className="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"/></svg>
        </button>
        <button className="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" stroke="currentColor"><path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"/></svg>
        </button>
      </div>
    </>
  )
}

export default ExerciseClient;