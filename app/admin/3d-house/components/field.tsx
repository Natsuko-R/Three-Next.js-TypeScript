import React from 'react'

import { Box } from '@/components/custom-ui/box'
import { FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface FieldProps {
    label: string
    labelStyle?: string
    name?: string;
    children: React.ReactNode
}

export const Field: React.FC<FieldProps> = ({ name, label, labelStyle, children }) => {
    return (
        <Box className='flex flex-col items-start space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0'>
            <Box className='h-10 items-center p-0'>
                <FormLabel htmlFor={name} className={cn('w-[160px] text-left md:text-right', labelStyle)}>
                    {label}
                </FormLabel>
            </Box>
            <Box className=' flex-col items-start space-y-2 p-0'>
                <Box className='p-0'>
                    {children}
                </Box>
                <FormMessage />
            </Box>
        </Box>
    )
}