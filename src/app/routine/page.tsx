import Image from 'next/image'
import Link from 'next/link'
import { Exercise } from '../../types/types'

async function getData() {
  const res = await fetch('https://mobility-server-production.up.railway.app/exercises');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const RoutinePage = async () => {
  const exercises: Exercise[] = await getData();
  // randomly select a set of 25 exercises
  console.log("data: ", exercises);
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='max-w-5xl'>
        {exercises.map(exercise => (
          <div key={exercise.id} className='flex items-center space-x-6 m-6' >
            <Image
              src={`/${exercise.image}.png`}
              alt='Picture of the exercise'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              width={80} //automatically provided
              height={80} //automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            />
            <span>{exercise.name}</span>
          </div>
        ))}
        <div className='text-center absolute inset-x-0 bottom-5'>
          <Link href='/exercise'>
            <button className="btn btn-primary btn-wide">Start</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default RoutinePage;