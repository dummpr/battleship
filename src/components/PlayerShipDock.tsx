import { shallowEqual } from 'react-redux'
import { PositionedShip } from '../lib/battleshipGame.types'
import {
  selectMarkedPositionsByShipId,
  selectPositionedShips,
} from '../store/battleshipGame/battleshipGameSlice'
import { useAppSelector } from '../store/hooks'
import ShipDock from './ShipDock'
import ShipDockItem from './ShipDockItem'

/**
 * A Redux connected version of the component, ShipDock.
 *
 * Currently, it is only responsible for showing the hit ships.
 * Though, it could be also changed to handle player switching
 * if there would be a multi-player setup.
 */
export default function PlayerShipDock() {
  const positionedShips = useAppSelector(selectPositionedShips)
  return (
    <ShipDock
      positionedShips={positionedShips}
      renderShipDockItem={(positionedShip) => (
        <PlayerShipDockItem
          key={positionedShip.shipId}
          positionedShip={positionedShip}
        />
      )}
    />
  )
}

function PlayerShipDockItem({
  positionedShip,
}: {
  positionedShip: PositionedShip
}) {
  const markedPositions = useAppSelector(
    selectMarkedPositionsByShipId(positionedShip.shipId),
    shallowEqual,
  )

  return (
    <ShipDockItem
      shipId={positionedShip.shipId}
      partsCount={positionedShip.positions.length}
      maxPartsCount={5}
      partsHitCount={markedPositions.length}
    />
  )
}
