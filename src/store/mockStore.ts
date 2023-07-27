import { configureStore } from '@reduxjs/toolkit'
import { RootState } from './store'
import battleship, {
  initialState as battleshipInitialState,
} from './battleshipGame/battleshipGameSlice'

export const mockStore = (preloadedState: Partial<RootState>) => {
  const store = configureStore({
    reducer: {
      battleship,
    },
    preloadedState: {
      battleship: battleshipInitialState,
      ...preloadedState,
    },
  })
  return store
}
