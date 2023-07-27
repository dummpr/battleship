import type { Meta, StoryObj } from '@storybook/react'
import ShipDockItem from './ShipDockItem'

const meta: Meta<typeof ShipDockItem> = {
  title: 'Molecule/ShipDockItem',
  component: ShipDockItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ShipDockItem>

export const Carrier: Story = {
  args: {
    shipId: 'carrier',
    partsCount: 2,
    partsHitCount: 2,
    maxPartsCount: 5,
  },
}

export const Aircraft: Story = {
  args: {
    shipId: 'destroyer',
    partsCount: 5,
    partsHitCount: 0,
    maxPartsCount: 5,
  },
}

export const Battleship: Story = {
  args: {
    shipId: 'battleship',
    partsCount: 4,
    partsHitCount: 0,
    maxPartsCount: 5,
  },
}

export const Cruiser: Story = {
  args: {
    shipId: 'cruiser',
    partsCount: 3,
    partsHitCount: 0,
    maxPartsCount: 5,
  },
}

export const Submarine: Story = {
  args: {
    shipId: 'submarine',
    partsCount: 3,
    partsHitCount: 0,
    maxPartsCount: 5,
  },
}

export const InSmallContainer: Story = {
  decorators: [(story) => <div className='w-[200px]'>{story()}</div>],
  args: {
    shipId: 'submarine',
    partsCount: 3,
    partsHitCount: 0,
    maxPartsCount: 5,
  },
}
