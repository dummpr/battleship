import { ReactNode } from 'react'
import { PositionedShip } from '../lib/battleshipGame.types'

interface Props {
  positionedShips: PositionedShip[]
  renderShipDockItem: (positionedShip: PositionedShip) => ReactNode
}

export default function ShipDock(props: Props) {
  return (
    <div className='flex flex-col flex-wrap justify-start align-top'>
      {props.positionedShips.map((positionedShip) =>
        props.renderShipDockItem(positionedShip),
      )}
    </div>
  )
}
