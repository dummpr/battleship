import { PositionedShip, MarkedPosition } from './battleshipGame.types'

const positionedShips: PositionedShip[] = [
  {
    shipId: 'battleship',
    positions: [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
    ],
  },
]

const markedPositionIds: string[] = ['0,0', '0,2', '0,3']

const markedPositionsById: { [id: string]: MarkedPosition } = {
  '0,0': {
    markedShipId: 'destroyer',
    position: [0, 0],
    positionId: '0,0',
  },
  '0,2': {
    position: [0, 2],
    positionId: '0,2',
  },
  '0,3': {
    position: [0, 3],
    positionId: '0,3',
  },
}
export { positionedShips, markedPositionIds, markedPositionsById }
