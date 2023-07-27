import type { Meta, StoryObj } from '@storybook/react'
import PlayerScoreBoard from './PlayerScoreBoard'

const meta: Meta<typeof PlayerScoreBoard> = {
  title: 'Organism/PlayerScoreBoard',
  component: PlayerScoreBoard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PlayerScoreBoard>

export const Default: Story = {}
