import ExerciseClient from './ExerciseClient'
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

const ExercisePage = async () => {
  const exercises: Exercise[] = await getData();

  return (
    <main className="font-mono text-lg p-10 flex min-h-screen flex-col items-center space-y-10">
      <ExerciseClient exercises={exercises} />
    </main>
  )
}

export default ExercisePage;
