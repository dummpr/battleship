import {
  BattleshipGameState,
  GameState,
  MarkedPosition,
  Position,
  ShipsOverlappingException,
} from './battleshipGame.types'

const start = (state: BattleshipGameState): BattleshipGameState => {
  _validateOverlappingShips(state)
  return {
    ...state,
    markedPositionsById: {},
    markedPositionIds: [],
    gameState: GameState.STARTED,
  }
}

const _validateOverlappingShips = (state: BattleshipGameState): boolean => {
  const overlappingShipIds: string[] = []
  const comparedShipCombinations: string[] = []

  // Loop through all positioned ships
  for (
    let shipIndex = 0;
    shipIndex < state.positionedShips.length;
    shipIndex++
  ) {
    // Anoter loop through all positioned ships for comparison
    for (
      let compareShipIndex = 0;
      compareShipIndex < state.positionedShips.length;
      compareShipIndex++
    ) {
      // Prevent comparing same ship
      if (shipIndex === compareShipIndex) {
        continue
      }

      // Prevent comparing through same shipIndex and compareShipIndex combination
      if (
        comparedShipCombinations.includes(
          [shipIndex, compareShipIndex].toString(),
        )
      ) {
        continue
      }

      // Cache shipIndex and compareShipIndex combination
      comparedShipCombinations.push([compareShipIndex, shipIndex].toString())

      const shipPositions = state.positionedShips[shipIndex].positions
      const compareShipPositions =
        state.positionedShips[compareShipIndex].positions

      if (_hasOverlappingPositions(shipPositions, compareShipPositions)) {
        overlappingShipIds.push(state.positionedShips[shipIndex].shipId)
        overlappingShipIds.push(state.positionedShips[compareShipIndex].shipId)
      }
    }
  }

  if (overlappingShipIds.length === 0) {
    return true
  }

  const uniqueShipIds = Array.from(new Set(overlappingShipIds))
  throw new ShipsOverlappingException(uniqueShipIds)
}

const _hasOverlappingPositions = (
  positionsA: Position[],
  positionsB: Position[],
) => {
  for (
    let positionIndex = 0;
    positionIndex < positionsA.length;
    positionIndex++
  ) {
    const findPosition = positionsA[positionIndex]
    const includes = positionsB.find((current) => {
      return current.toString() === findPosition.toString()
    })

    if (includes) {
      return true
    }
  }
  return false
}

const markPosition = (
  state: BattleshipGameState,
  payload: Position,
): BattleshipGameState => {
  const hitShipId = _checkForHitShip(state, payload)
  const positionId = payload.toString()

  const newState = {
    ...state,
    markedPositionIds: [...state.markedPositionIds, payload.toString()],
    markedPositionsById: {
      ...state.markedPositionsById,
      [positionId]: {
        positionId,
        markedShipId: hitShipId,
        position: payload,
      },
    },
  }

  const gameOver = isGameOver(newState)
  newState.gameState = gameOver ? GameState.ENDED : GameState.STARTED

  return newState
}

const _checkForHitShip = (
  state: BattleshipGameState,
  position: Position,
): string | undefined => {
  for (
    let shipIndex = 0;
    shipIndex < state.positionedShips.length;
    shipIndex++
  ) {
    const includes = state.positionedShips[shipIndex].positions.find(
      (current) => {
        return current.toString() === position.toString()
      },
    )

    if (includes) {
      return state.positionedShips[shipIndex].shipId
    }
  }

  return undefined
}

const getMissMarks = (state: BattleshipGameState): MarkedPosition[] => {
  return state.markedPositionIds
    .filter((id) => !state.markedPositionsById[id].markedShipId)
    .map((id) => state.markedPositionsById[id])
}
const getHitMarks = (state: BattleshipGameState): MarkedPosition[] => {
  return state.markedPositionIds
    .filter((id) => state.markedPositionsById[id].markedShipId)
    .map((id) => state.markedPositionsById[id])
}

const isGameOver = (state: BattleshipGameState): boolean => {
  if (state.positionedShips.length === 0) return false
  const sunkedShipIds = getSunkedShipIds(state)
  return sunkedShipIds.length === state.positionedShips.length
}

const getSunkedShipIds = (state: BattleshipGameState): string[] => {
  const sunkedShipIds: string[] = []
  for (
    let shipIndex = 0;
    shipIndex < state.positionedShips.length;
    shipIndex++
  ) {
    const positionedShip = state.positionedShips[shipIndex]
    const markedShipPositions = state.markedPositionIds.filter(
      (id) =>
        state.markedPositionsById[id].markedShipId === positionedShip.shipId,
    )

    if (positionedShip.positions.length === markedShipPositions.length) {
      sunkedShipIds.push(positionedShip.shipId)
    }
  }
  return sunkedShipIds
}

export default {
  start,
  markPosition,
  getMissMarks,
  getHitMarks,
  isGameOver,
  getSunkedShipIds,
}
