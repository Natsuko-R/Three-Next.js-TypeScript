import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="flex justify-center mt-100">
      <Link
        target="_self"
        rel="noreferrer"
        href="/type-400"
        className={buttonVariants({ size: "lg" })}
      >
        type-400
      </Link>
    </div>

  )
}
