import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import battleshipGame from '../../lib/battleshipGame'
import {
  BattleshipGameState,
  GameState,
  Position,
  ShipsOverlappingException,
} from '../../lib/battleshipGame.types'
import { RootState } from '../store'

export const initialState: BattleshipGameState = {
  positionedShips: [],
  markedPositionsById: {},
  markedPositionIds: [],
  gameState: GameState.STARTED,
}

export const battleshipGameSlice = createSlice({
  name: 'battleshipGame',
  initialState,
  reducers: {
    start(state, action: PayloadAction<BattleshipGameState>) {
      try {
        return battleshipGame.start(action.payload)
      } catch (e) {
        if (e instanceof ShipsOverlappingException) {
          state.gameState = GameState.STARTED
          state.positionedShips = []
          state.markedPositionIds = []
          state.markedPositionsById = {}
        }
      }
    },
    markPosition(state, action: PayloadAction<Position>) {
      return battleshipGame.markPosition(state, action.payload)
    },
  },
})

export const { start, markPosition } = battleshipGameSlice.actions

export const selectPositionedShips = (state: RootState) =>
  state.battleship.positionedShips

export const selectMarkedPositions = (state: RootState) =>
  state.battleship.markedPositionIds.map(
    (id) => state.battleship.markedPositionsById[id],
  )

export const selectMarkedPositionByPosition = (position: Position) => {
  return (state: RootState) =>
    state.battleship.markedPositionsById[position.toString()]
}

export const selectMarkedPositionsByShipId = (shipId: string) => {
  return (state: RootState) =>
    state.battleship.markedPositionIds
      .filter(
        (id) =>
          state.battleship.markedPositionsById[id].markedShipId === shipId,
      )
      .map((id) => state.battleship.markedPositionsById[id])
}

export const selectIsGameOver = (state: RootState) =>
  state.battleship.gameState === GameState.ENDED

export default battleshipGameSlice.reducer
