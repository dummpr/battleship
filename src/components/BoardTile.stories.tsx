import type { Meta, StoryObj } from '@storybook/react'
import BoardTile from './BoardTile'

const meta: Meta<typeof BoardTile> = {
  title: 'Molecule/BoardTile',
  component: BoardTile,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BoardTile>

export const Empty: Story = {
  args: {
    onClick: () => {
      console.log('clicked')
    },
    label: 'Aria label for accessibility',
  },
}

export const Hit: Story = {
  args: {
    ...Empty.args,
    markType: 'hit',
  },
}

export const Miss: Story = {
  args: {
    ...Empty.args,
    markType: 'miss',
  },
}
