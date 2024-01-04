"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface CustomCheckboxOption {
  label: string
  value: string
}

type LayoutType = "horizontal" | "vertical" // 只允许是给定的值

export interface CustomCheckboxProps {
  value: string[]
  options: CustomCheckboxOption[]
  label?: string
  className?: string
  labelStyle?: string
  containerStyle?: string
  layout: LayoutType
  onChange?: (value: string, curValue?: string[]) => void
}

export const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  value,
  options,
  label,
  className,
  labelStyle,
  containerStyle,
  layout,
  onChange,
}) => {
  const [curValue, setCurValue] = useState<string[]>([])
  const [inited, setInited] = useState<boolean>(false)

  useEffect(() => {
    if (!inited && value.length > 0) {
      setCurValue(value)
      setInited(true)
    }
  }, [inited])

  // 接受一个名为value的字符串作为参数，并返回一个箭头函数 
  // 避免this指向问题 
  // FilterContainer组件中handleFieldChange方法的第一个下划线参数为占位符
  const handleChange = useCallback(
    (value: string) => () => {
      const newValue: string[] = curValue.includes(value) ? curValue.filter(item => item !== value) : [...curValue, value]
      setCurValue(newValue)
      onChange && onChange(value, newValue)
    },
    [onChange, curValue]
  )

  const Options = useMemo(() => {
    return options?.map(({ label, value: optionValue }) => {
      return (
        <div className={cn("flex items-center")} key={optionValue}>
          <Checkbox id={optionValue} onCheckedChange={handleChange(optionValue)} checked={curValue.includes(optionValue)} />
          <label htmlFor={optionValue} className="pl-2 ">
            {label}
          </label>
        </div>
      )
    })
  }, [options, value]) // value 别忘了

  return (
    <div className={cn("flex flex-row space-x-2", containerStyle)}>
      {label && (
        <Label>
          {label}
        </Label>
      )}
      <div >
        {Options}
      </div>
    </div>
  )
}
