import type { Meta, StoryObj } from '@storybook/react'
import ShipDock from './ShipDock'
import ShipDockItem from './ShipDockItem'

const meta: Meta<typeof ShipDock> = {
  title: 'Molecule/ShipDock',
  component: ShipDock,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ShipDock>

export const WithEmptyMarks: Story = {
  args: {
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
    renderShipDockItem: (positionedShip) => {
      return (
        <ShipDockItem
          partsHitCount={0}
          shipId={positionedShip.shipId}
          partsCount={3}
          maxPartsCount={5}
        />
      )
    },
  },
}

export const WithHitMarks: Story = {
  args: {
    ...WithEmptyMarks.args,
    renderShipDockItem: (positionedShip) => {
      return (
        <ShipDockItem
          partsHitCount={3}
          shipId={positionedShip.shipId}
          partsCount={3}
          maxPartsCount={5}
        />
      )
    },
  },
}

export const InSmallHeightContainer: Story = {
  decorators: [(story) => <div className='h-[120px] w-full'>{story()}</div>],
  args: {
    ...WithEmptyMarks.args,
    renderShipDockItem: (positionedShip) => {
      return (
        <ShipDockItem
          partsHitCount={0}
          shipId={positionedShip.shipId}
          partsCount={5}
          maxPartsCount={5}
        />
      )
    },
  },
}
