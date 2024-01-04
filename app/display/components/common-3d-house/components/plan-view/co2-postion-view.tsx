interface Co2PositionViewProps {
  img: string
}

export const Co2PositionView: React.FC<Co2PositionViewProps> = ({ img }) => {
  return (
    <img
      src={img}
      alt="CO₂センサ
    "
    />
  )
}
