export type Position = [x: number, y: number]

export interface PositionedShip {
  shipId: string
  positions: Position[]
}

export interface MarkedPosition {
  positionId: string
  position: Position
  markedShipId?: string
}

export enum GameState {
  STARTED,
  ENDED,
}

export interface BattleshipGameState {
  positionedShips: PositionedShip[]
  markedPositionsById: {
    [id: string]: MarkedPosition
  }
  markedPositionIds: string[]
  gameState?: GameState
}

export class ShipsOverlappingException extends Error {
  shipIds: string[]

  public constructor(shipIds: string[]) {
    super('There are overlapping ship positions')
    this.shipIds = shipIds
  }
}
