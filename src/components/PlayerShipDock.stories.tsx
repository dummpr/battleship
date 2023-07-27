import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { mockStore } from '../store/mockStore'
import PlayerShipDock from './PlayerShipDock'

const mockedStore = mockStore({
  battleship: {
    markedPositionIds: ['2,9'],
    markedPositionsById: {
      '2,9': {
        positionId: '2,9',
        markedShipId: 'carrier',
        position: [2, 9],
      },
    },
    positionedShips: [
      {
        shipId: 'carrier',
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
        shipId: 'destroyer',
        positions: [
          [0, 0],
          [1, 0],
        ],
      },
    ],
  },
})

const meta: Meta<typeof PlayerShipDock> = {
  title: 'Organism/PlayerShipDock',
  component: PlayerShipDock,
  tags: ['autodocs'],
  decorators: [(story) => <Provider store={mockedStore}>{story()}</Provider>],
}

export default meta
type Story = StoryObj<typeof PlayerShipDock>

export const Default: Story = {}
