import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, waitFor } from '@storybook/testing-library'
import { Provider } from 'react-redux'
import { mockStore } from '../store/mockStore'
import BattleshipGamePage from './BattleshipGamePage'

const meta: Meta<typeof BattleshipGamePage> = {
  title: 'Page/BattleshipGamePage',
  component: BattleshipGamePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof BattleshipGamePage>

export const GameStart: Story = {
  decorators: [
    (story) => {
      const mockedStore = mockStore({})
      return <Provider store={mockedStore}>{story()}</Provider>
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => {
      expect(canvas.getByTestId('carrierShip')).toBeInTheDocument()
      expect(canvas.getByTestId('battleshipShip')).toBeInTheDocument()
      expect(canvas.getByTestId('cruiserShip')).toBeInTheDocument()
      expect(canvas.getByTestId('submarineShip')).toBeInTheDocument()
      expect(canvas.getByTestId('destroyerShip')).toBeInTheDocument()
    })
  },
}

export const SunkedShip: Story = {
  decorators: [
    (story) => {
      const mockedStore = mockStore({})
      return <Provider store={mockedStore}>{story()}</Provider>
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => {
      expect(canvas.getByTestId('carrierShip')).toBeInTheDocument()
    })

    userEvent.click(canvas.getByTestId('tileC2R9'))
    userEvent.click(canvas.getByTestId('tileC3R9'))
    userEvent.click(canvas.getByTestId('tileC4R9'))
    userEvent.click(canvas.getByTestId('tileC5R9'))
    userEvent.click(canvas.getByTestId('tileC6R9'))

    await waitFor(() => {
      const carrierShip = canvas.getByTestId('carrierShip')
      const shipMarksContainer = carrierShip.getElementsByClassName(
        'ship-dock-item__status-marks',
      )[0]
      const shipMarks = Array.from(
        shipMarksContainer.getElementsByClassName('mark'),
      )

      for (const mark of shipMarks) {
        const img = mark.getElementsByTagName('img')[0]
        expect(img.getAttribute('alt')).toBe('hit')
      }
    })
  },
}

export const GameOver: Story = {
  decorators: [
    (story) => {
      const mockedStore = mockStore({})
      return <Provider store={mockedStore}>{story()}</Provider>
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => {
      expect(canvas.getByTestId('carrierShip')).toBeInTheDocument()
      expect(canvas.getByTestId('battleshipShip')).toBeInTheDocument()
      expect(canvas.getByTestId('cruiserShip')).toBeInTheDocument()
      expect(canvas.getByTestId('submarineShip')).toBeInTheDocument()
      expect(canvas.getByTestId('destroyerShip')).toBeInTheDocument()
    })

    userEvent.click(canvas.getByTestId('tileC2R9'))
    userEvent.click(canvas.getByTestId('tileC3R9'))
    userEvent.click(canvas.getByTestId('tileC4R9'))
    userEvent.click(canvas.getByTestId('tileC5R9'))
    userEvent.click(canvas.getByTestId('tileC6R9'))

    userEvent.click(canvas.getByTestId('tileC5R2'))
    userEvent.click(canvas.getByTestId('tileC5R3'))
    userEvent.click(canvas.getByTestId('tileC5R4'))
    userEvent.click(canvas.getByTestId('tileC5R5'))

    userEvent.click(canvas.getByTestId('tileC8R1'))
    userEvent.click(canvas.getByTestId('tileC8R2'))
    userEvent.click(canvas.getByTestId('tileC8R3'))

    userEvent.click(canvas.getByTestId('tileC3R0'))
    userEvent.click(canvas.getByTestId('tileC3R1'))
    userEvent.click(canvas.getByTestId('tileC3R2'))

    userEvent.click(canvas.getByTestId('tileC0R0'))
    userEvent.click(canvas.getByTestId('tileC1R0'))

    // await waitFor(() => {})
  },
}
