import type { Meta, StoryObj } from '@storybook/react'
import AppBar from './AppBar'

const meta: Meta<typeof AppBar> = {
  title: 'Molecule/AppBar',
  component: AppBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppBar>

export const Default: Story = {}
