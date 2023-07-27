import type { Meta, StoryObj } from '@storybook/react'
import ScoreBoard from './ScoreBoard'

const meta: Meta<typeof ScoreBoard> = {
  title: 'Molecule/ScoreBoard',
  component: ScoreBoard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScoreBoard>

export const Default: Story = {
  args: {
    player1Name: 'player 1',
    player1Score: 0,
    player2Name: 'player 2',
    player2Score: 0,
  },
}
