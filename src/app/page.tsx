import Image from 'next/image'

type Exercise = {
  id: string,
  name: string,
  image: string
}

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

export default async function Home() {
  const exercises: Exercise[] = await getData();
  console.log("data: " , exercises);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {exercises.map(exercise => (
          <div key={exercise.id} className='flex flex-row space-x-3 m-12' >
            <Image
              src={`/${exercise.image}.png`}
              alt="Picture of the exercise"
              width={100} //automatically provided
              height={100} //automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <p>{exercise.name}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
