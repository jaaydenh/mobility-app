import React from 'react';
import Title from './components/title';
import Link from 'next/link';
import Image from 'next/image';

export default async function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Title text="Daily Routines" />
        {/* <div className='flex justify-center'> */}
        <Link href="/routine" className="flex justify-center">
          <div className="card w-80 bg-base-100 shadow-xl">
            <figure className="px-6 pt-8">
              <Image
                src="/downward_dog.png"
                alt="See workouts!"
                width={300}
                height={300}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Daily routine 10-15 min</h2>
              <p>At home or at work</p>
            </div>
          </div>
        </Link>
        {/* </div> */}
      </div>
    </main>
  );
}
