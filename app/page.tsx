import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center">

      <div className='text-4xl my-20'>
        Hello Three.js !
      </div>

      <div className="flex space-x-10">

        <Link
          href={"https://ui.shadcn.com/"}
          target='_blank'
        >
          shadcn
        </Link>

        <Link
          href={"https://tailwindcss.com/"}
          target='_blank'
        >
          tailwindcss
        </Link>

      </div>
    </main>
  )
}
