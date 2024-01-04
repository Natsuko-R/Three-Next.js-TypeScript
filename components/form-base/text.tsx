import { cn } from "@/lib/utils"

interface TextProps {
  children?: React.ReactNode
  className?: string
}

export const Text: React.FC<TextProps> = ({ children, className }) => {
  return (
    <span className={cn("text-sm font-normal", className)}>{children}</span>
  )
}

interface ValueTextProps extends TextProps {
  value?: React.ReactNode
}

export const ValueText: React.FC<ValueTextProps> = ({ value, ...props }) => {
  return value || props.children ? (
    <Text {...props} className="font-bold mx-1">
      {value || props.children}
      {/* {...props} 中包含一部分className, 由于React会采用"后者覆盖前者"的原则，因此 className 属性将以最后指定的值为准，即 "font-bold mx-1" */}
    </Text>
  ) : (
    <Text>--</Text>
  )
}
