import { ReactNode } from 'react'
import { cs } from '../lib/cssUtils'

interface Props {
  renderTile: (columnIndex: number, rowIndex: number) => ReactNode
}

const boardSize = [10, 10]

export default function TargetRangeBoard(props: Props) {
  return (
    <div className={cs('border-orange border-4')}>
      <div className='w-full border-[1px] bg-gray-400 border-gray-400'>
        <div className='flex flex-col gap-[1px]'>
          {[...Array(boardSize[1])].map((_, rowIndex) => (
            <div
              key={`row+${rowIndex}`}
              className='flex gap-[1px] flex-row flex-nowrap'
            >
              {[...Array(boardSize[0])].map((_, columnIndex) =>
                props.renderTile(columnIndex, rowIndex),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
