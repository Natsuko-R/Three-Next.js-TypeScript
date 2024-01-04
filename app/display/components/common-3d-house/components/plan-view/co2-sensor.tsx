import { useMemo } from 'react'
import { Box } from '@/components/custom-ui/box'
import { AlignHorizontalDistributeCenter } from 'lucide-react'

import { CO2_SENSORS } from './data'
import { AreaType } from './types'

interface SensorProps {
    name: string
}

const Sensor: React.FC<SensorProps> = ({ name }) => {
    return (
        <Box className='flex-col items-center gap-2'>
            <AlignHorizontalDistributeCenter />
            <span className='text-md font-semibold'>{name}</span>
        </Box>
    )
}

interface AreaProps {
    data: AreaType;
}

const Area: React.FC<AreaProps> = ({ data: { id, name, left, middle, right } }) => {
    return (
        <Box className='items-center space-x-4 rounded-lg bg-slate-300 p-0'>
            {/* <Box className='w-[100px] justify-center' /> */}
            <Box className='grid grid-cols-3 items-center gap-10 p-0'>
                <Box className='h-[100px] w-[120px] items-center justify-center' >
                    {left && <Sensor name={left.name} />}
                </Box>
                <Box className='h-[100px] w-[120px] items-center justify-center'>
                    {middle && <Sensor name={middle.name} />}
                </Box>
                <Box className='h-[100px] w-[120px] items-center justify-center'>
                    {right && <Sensor name={right.name} />}
                </Box>
            </Box>
            <Box className='w-[100px] justify-center'>
                <span className='text-sm font-semibold'>{name}</span>
            </Box>
        </Box>
    )
}


export const CO2Sensor: React.FC = () => {

    const AreaList = useMemo(() => {
        return CO2_SENSORS.map(area => (
            <Area key={area.id} data={area} />
        ))
    }, [])

    return (
        <Box className="flex-col gap-4 p-0">
            {AreaList}
        </Box>
    )
}