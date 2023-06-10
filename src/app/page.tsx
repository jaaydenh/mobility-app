import Link from 'next/link'

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-lg lg:flex">
        {"Hello World"}
        <div className='text-center absolute inset-x-0 bottom-5'>
          <Link href="/routine">
            <button className="btn btn-primary btn-wide">Image Button</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
