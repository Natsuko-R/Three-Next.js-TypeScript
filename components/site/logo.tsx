import { memo } from "react"
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export const Logo = memo(() => {
  return (
    <div className="w-[100px]">
      <AspectRatio ratio={128 / 65}>
        <Image
          priority={true}
          src="/omcon_logo.png"
          alt="logo"
          width={128}
          height={65}
          blurDataURL={"/omcon_logo.png"}
        />
      </AspectRatio>
    </div>
  )
})
