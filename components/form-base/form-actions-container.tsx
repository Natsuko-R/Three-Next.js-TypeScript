import React from 'react'

import { Box } from '@/components/custom-ui/box'
import { cn } from '@/lib/utils'

interface FieldProps {
    labelStyles?: string // 定义标签的样式
    children: React.ReactNode
}

export const FormActionsContainer: React.FC<FieldProps> = ({ children, labelStyles }) => {
    return (
        <Box className='flex md:flex-row md:items-start items-start flex-col space-y-2 md:space-y-0 md:space-x-2'>
            <Box className='p-0 h-10 items-center hidden md:flex'>
                <Box className={cn('w-[160px] p-0', labelStyles)} />
            </Box>
            <Box className=' flex-col items-start p-0 space-y-2 min-h-6'>
                <Box className='p-0 space-x-2'>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

// hidden: 这是一个Tailwind CSS的类名，用于控制元素的可见性。hidden类名将元素隐藏，使其在页面上不可见。通常，这个类名用于响应式设计，可以根据不同屏幕尺寸控制元素的可见性。

// md:flex: 这也是一个Tailwind CSS的类名，用于设置元素的显示方式。md:flex表示在中等屏幕尺寸（通常是大屏幕）上，将元素以弹性布局的方式显示，即元素的子元素将按