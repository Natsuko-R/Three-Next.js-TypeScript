export type ButtonItemType = {
  id: number
  label: string
}

export type BlockType = {
  id: string
  name: string
  isOpen: boolean
}
export type SensorType = {
  id: string
  name: string
}

export type AreaType = {
  id: string
  name: string
  left: SensorType | null
  middle: SensorType | null
  right: SensorType | null
}

export type StepType = {
  id: number
  name: string
  isOpen: boolean
}
