import { BattleshipGameState } from '../lib/battleshipGame.types'

export const startingGameData: BattleshipGameState = {
  markedPositionsById: {},
  markedPositionIds: [],
  positionedShips: [
    {
      shipId: 'destroyer',
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      shipId: 'battleship',
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      shipId: 'cruiser',
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      shipId: 'submarine',
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      shipId: 'carrier',
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
}
