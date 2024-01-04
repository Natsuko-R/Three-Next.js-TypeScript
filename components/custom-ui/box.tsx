import { cn } from "@/lib/utils"
import { CSSProperties, PropsWithChildren } from "react"

interface BoxProps extends PropsWithChildren {
    id?: string
    className?: string
    style?: CSSProperties
}

export const Box: React.FC<BoxProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("flex p-2", className)} {...props}>
            {children}
        </div>
    )
}