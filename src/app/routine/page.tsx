import Image from 'next/image'
import Link from 'next/link'
import { Exercise } from '../../types/types'

async function getData() {
  const res = await fetch('http://localhost:4000/exercises');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Routine() {
  const exercises: Exercise[] = await getData();
  console.log("data: " , exercises);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-lg lg:flex">
        {exercises.map(exercise => (
          <div key={exercise.id} className='flex items-center space-x-6 m-12' >
            <Image
              src={`/${exercise.image}.png`}
              alt="Picture of the exercise"
              width={80} //automatically provided
              height={80} //automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <span>{exercise.name}</span>
          </div>
        ))}
        <div className='text-center absolute inset-x-0 bottom-5'>
        <Link href="/exercises/0">
          <button className="btn btn-primary btn-wide">Start</button>
        </Link>
        </div>
      </div>
    </main>
  )
}
