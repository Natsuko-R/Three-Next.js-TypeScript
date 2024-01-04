import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IconButtonProps extends ButtonProps {
  className: string
}

export const IconButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      variant="outline"
      className={cn("h-10 w-10 rounded-full border-0 p-0", className)}
      {...props}
    >
      {children}
    </Button>
  )
}
