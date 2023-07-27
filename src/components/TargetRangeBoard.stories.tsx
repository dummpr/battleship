import type { Meta, StoryObj } from '@storybook/react'
import BoardTile from './BoardTile'
import TargetRangeBoard from './TargetRangeBoard'

const meta: Meta<typeof TargetRangeBoard> = {
  title: 'Molecule/TargetRangeBoard',
  component: TargetRangeBoard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TargetRangeBoard>

export const Empty: Story = {
  args: {
    renderTile: (columnIndex: number, rowIndex: number) => (
      <BoardTile
        key={`${columnIndex}+${rowIndex}`}
        label={`Tile at column ${columnIndex}, row ${rowIndex}`}
        onClick={() => {
          console.log('clicked')
        }}
      />
    ),
  },
}
export const WithHitMarks: Story = {
  args: {
    renderTile: (columnIndex: number, rowIndex: number) => {
      return (
        <BoardTile
          key={`${columnIndex}+${rowIndex}`}
          markType='hit'
          label={`tile at column ${columnIndex}, row ${rowIndex}`}
          onClick={() => {
            console.log('clicked')
          }}
        />
      )
    },
  },
}

export const WithMissMarks: Story = {
  args: {
    renderTile: (columnIndex: number, rowIndex: number) => {
      return (
        <BoardTile
          key={`${columnIndex}+${rowIndex}`}
          markType='miss'
          label={`tile at column ${columnIndex}, row ${rowIndex}`}
          onClick={() => {
            console.log('clicked')
          }}
        />
      )
    },
  },
}
