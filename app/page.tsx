"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const handleClick = () => {
    router.push("/dashboard/project")
  }

  const handleClickHome = () => {
    router.push("/admin/customer")
  }

  const handleClickUser = () => {
    router.push("/type-400")
  }
  return (
    <main className="flex flex-col items-center">

      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Hello <br className="hidden sm:inline" />
            Natsuki
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            but wisdom hasn't found me yet
          </p>
        </div>
        <div className="flex gap-4">

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ size: "lg" })}
          >
            github
          </Link>

          <div className="flex space-x-2">

            <Button onClick={handleClick}>3D page</Button>
            <Button onClick={handleClickHome}>My Home</Button>
            <Button onClick={handleClickUser}>TYPE-400</Button>

          </div>

        </div>
      </section>
    </main>
  )
}
