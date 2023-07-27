import { configureStore } from '@reduxjs/toolkit'
import battleship from './battleshipGame/battleshipGameSlice'

export const store = configureStore({
  reducer: {
    battleship,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
