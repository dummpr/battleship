import battleshipGame from './battleshipGame'
import {
  BattleshipGameState,
  GameState,
  MarkedPosition,
  Position,
  PositionedShip,
  ShipsOverlappingException,
} from './battleshipGame.types'
import {
  positionedShips,
  markedPositionsById,
  markedPositionIds,
} from './battleshipGame.mocks'

describe('battleshipGame', () => {
  let state: BattleshipGameState
  beforeEach(() => {
    state = {
      gameState: GameState.STARTED,
      positionedShips,
      markedPositionsById,
      markedPositionIds,
    }
  })

  describe('start', () => {
    it('should reset [BattleshipGameState.markedPositions] and return [BattleshipGameState]', () => {
      const received = battleshipGame.start(state)
      const expected = {
        ...state,
        gameState: GameState.STARTED,
        markedPositionsById: {},
        markedPositionIds: [],
      }

      expect(received).toEqual(expected)
    })
    it('should throw [ShipsOverlappingException] if there are [PositionedShip] that overlaps another', () => {
      const positionedShips: PositionedShip[] = [
        {
          shipId: 'carrier',
          positions: [
            [0, 0],
            [0, 1],
          ],
        },
        {
          shipId: 'generic_ship',
          positions: [
            [0, 1],
            [0, 3],
          ],
        },
      ]
      state.positionedShips = positionedShips

      try {
        battleshipGame.start(state)
      } catch (e) {
        expect(e).toBeInstanceOf(ShipsOverlappingException)
        expect(e).toHaveProperty(
          'message',
          'There are overlapping ship positions',
        )
        expect(e).toHaveProperty('shipIds', ['carrier', 'generic_ship'])
      }
    })
  })

  describe('markPosition', () => {
    it('should return [BattleshipGameState] with the new [MarkedPosition] without [markedShipId] position did not hit a ship position', () => {
      const position: Position = [0, 2]

      const received = battleshipGame.markPosition(state, position)
      const expected = {
        ...state,
        markedPositionIds: [...state.markedPositionIds, position.toString()],
        markedPositionsById: {
          ...state.markedPositionsById,
          [position.toString()]: {
            positionId: position.toString(),
            position,
          },
        },
      }

      expect(received).toEqual(expected)
    })

    it('should return [BattleshipGameState] with the new [MarkedPosition] with[markedShipId] position hit a ship position', () => {
      const position: Position = [5, 4]

      const received = battleshipGame.markPosition(state, position)
      const expected = {
        ...state,
        markedPositionIds: [...state.markedPositionIds, position.toString()],
        markedPositionsById: {
          ...state.markedPositionsById,
          [position.toString()]: {
            positionId: position.toString(),
            position,
            markedShipId: 'battleship',
          },
        },
      }

      expect(received).toEqual(expected)
    })

    it('should return state with GameState.ENDED when all ships are hit', () => {
      const positions: Position[] = [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ]

      state = battleshipGame.markPosition(state, positions[0])
      state = battleshipGame.markPosition(state, positions[1])
      state = battleshipGame.markPosition(state, positions[2])
      state = battleshipGame.markPosition(state, positions[3])
      const expected = GameState.ENDED

      expect(state.gameState).toEqual(expected)
    })
  })

  describe('getMissedMarks', () => {
    it('should return an array of [MarkedPosition] that have empty [markedShipId]', () => {
      const received = battleshipGame.getMissMarks(state)
      const expected: MarkedPosition[] = [
        {
          positionId: '0,2',
          position: [0, 2],
        },
        {
          positionId: '0,3',
          position: [0, 3],
        },
      ]

      expect(received).toEqual(expected)
    })
  })

  describe('getHitMarks', () => {
    it('should return an array of [MarkedPosition] that have [markedShipId]', () => {
      const received = battleshipGame.getHitMarks(state)
      const expected: MarkedPosition[] = [
        {
          positionId: '0,0',
          markedShipId: 'destroyer',
          position: [0, 0],
        },
      ]

      expect(received).toEqual(expected)
    })
  })

  describe('getSunkedShipIds', () => {
    it('should return an array of [PositionedShip] if all ship positions are inside [BattleshipGameState.markedPositions]', () => {
      const markedPositionsById: { [id: string]: MarkedPosition } = {
        '5,2': {
          positionId: '5,2',
          markedShipId: 'battleship',
          position: [5, 2],
        },
        '5,3': {
          positionId: '5,3',
          markedShipId: 'battleship',
          position: [5, 3],
        },
        '5,4': {
          positionId: '5,4',
          markedShipId: 'battleship',
          position: [5, 4],
        },
        '5,5': {
          positionId: '5,5',
          markedShipId: 'battleship',
          position: [5, 5],
        },
      }

      state.markedPositionsById = markedPositionsById
      state.markedPositionIds = Object.keys(markedPositionsById)

      const received = battleshipGame.getSunkedShipIds(state)
      const expected: string[] = ['battleship']

      expect(received).toEqual(expected)
    })
    it('should return an empty array of [PositionedShip] if no ships have all ship positions are inside [BattleshipGameState.markedPositions]', () => {
      const markedPositionsById: { [id: string]: MarkedPosition } = {
        '5,3': {
          positionId: '5,3',
          markedShipId: 'battleship',
          position: [5, 3],
        },
        '5,4': {
          positionId: '5,4',
          markedShipId: 'battleship',
          position: [5, 4],
        },
        '5,5': {
          positionId: '5,5',
          markedShipId: 'battleship',
          position: [5, 5],
        },
      }

      state.markedPositionsById = markedPositionsById
      state.markedPositionIds = Object.keys(markedPositionsById)

      const received = battleshipGame.getSunkedShipIds(state)
      const expected: string[] = []

      expect(received).toEqual(expected)
    })
  })

  describe('isGameOver', () => {
    it('should return true if length of [getSunkedShipIds] matches the length of [BattleshipGameState.positionedShips]', () => {
      const markedPositionsById: { [id: string]: MarkedPosition } = {
        '5,2': {
          positionId: '5,2',
          markedShipId: 'battleship',
          position: [5, 2],
        },
        '5,3': {
          positionId: '5,3',
          markedShipId: 'battleship',
          position: [5, 3],
        },
        '5,4': {
          positionId: '5,4',
          markedShipId: 'battleship',
          position: [5, 4],
        },
        '5,5': {
          positionId: '5,5',
          markedShipId: 'battleship',
          position: [5, 5],
        },
      }

      state.markedPositionsById = markedPositionsById
      state.markedPositionIds = Object.keys(markedPositionsById)

      const received = battleshipGame.isGameOver(state)
      const expected = true

      expect(received).toEqual(expected)
    })
    it('should return false if length of [getSunkedShipIds] doesnt matche the length of [BattleshipGameState.positionedShips]', () => {
      const markedPositionsById: { [id: string]: MarkedPosition } = {
        '5,3': {
          positionId: '5,3',
          markedShipId: 'battleship',
          position: [5, 3],
        },
        '5,4': {
          positionId: '5,4',
          markedShipId: 'battleship',
          position: [5, 4],
        },
        '5,5': {
          positionId: '5,5',
          markedShipId: 'battleship',
          position: [5, 5],
        },
      }

      state.markedPositionsById = markedPositionsById
      state.markedPositionIds = Object.keys(markedPositionsById)

      const received = battleshipGame.isGameOver(state)
      const expected = false

      expect(received).toEqual(expected)
    })
  })
})
