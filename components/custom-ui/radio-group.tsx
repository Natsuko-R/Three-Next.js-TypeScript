import { useCallback, useMemo } from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioOption {
  label: string
  value: string
}

export interface CustomRadioGroupProps {
  label: string
  options: RadioOption[]
  value?: string
  className?: string
  defaultValue?: string
  radiosContentStyle?: string
  onChange?: (value: string) => void
  layout?: "horizontal" | "vertical"
}

export const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  defaultValue,
  layout,
}) => {
  const handleChange = useCallback(
    (value: string) => {
      onChange && onChange(value)
    },
    [onChange]
  )

  const Options = useMemo(() => {
    return options.map(({ label, value }) => (
      <div className="flex items-center space-x-2" key={value}>
        <RadioGroupItem value={value} id={value} />
        <Label htmlFor={value} className="cursor-pointer">
          {label}
        </Label>
      </div>
    ))
  }, [options])

  return (
    <div className={cn("flex items-center", className)}>
      <Label>{label}</Label>
      <RadioGroup
        onValueChange={handleChange}
        className={cn(
          "items-center",
          layout === "vertical" ? "flex flex-col" : "flex flex-wrap",
        )}
        value={value}
        defaultValue={defaultValue}
      >
        {Options}
      </RadioGroup>
    </div>
  )
}
