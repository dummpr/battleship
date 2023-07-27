import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { Provider } from 'react-redux'
import { mockStore } from '../store/mockStore'
import { RootState } from '../store/store'
import PlayerTargetRangeBoard from './PlayerTargetRangeBoard'

const initialState: Partial<RootState> = {
  battleship: {
    markedPositionsById: {},
    markedPositionIds: [],
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
}

const meta: Meta<typeof PlayerTargetRangeBoard> = {
  title: 'Organism/PlayerTargetRangeBoard',
  component: PlayerTargetRangeBoard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PlayerTargetRangeBoard>

export const MissTileOnClick: Story = {
  decorators: [
    (story) => {
      const mockedStore = mockStore(initialState)
      return <Provider store={mockedStore}>{story()}</Provider>
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const missTile = canvas.getByTestId('tileC4R1')
    userEvent.click(missTile)

    await waitFor(() => {
      expect(missTile.getAttribute('aria-label')).toBe(
        'miss tile at column 4, row 1',
      )
    })
  },
}

export const HitTileOnClick: Story = {
  decorators: [
    (story) => {
      const mockedStore = mockStore(initialState)
      return <Provider store={mockedStore}>{story()}</Provider>
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const hitTile = canvas.getByTestId('tileC0R0')
    userEvent.click(hitTile)
    await waitFor(() => {
      expect(hitTile.getAttribute('aria-label')).toBe(
        'hit tile at column 0, row 0',
      )
    })
  },
}
