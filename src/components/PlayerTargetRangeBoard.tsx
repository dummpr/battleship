import { useMemo } from 'react'
import {
  markPosition,
  selectIsGameOver,
  selectMarkedPositionByPosition,
} from '../store/battleshipGame/battleshipGameSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import BoardTile, { MarkType } from './BoardTile'
import TargetRangeBoard from './TargetRangeBoard'

/**
 * A redux connected version of TargetRangeBoard
 */
export default function PlayerTargetRangeBoard() {
  return (
    <TargetRangeBoard
      renderTile={(columnIndex, rowIndex) => (
        <Tile
          key={`${columnIndex}+${rowIndex}`}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
        />
      )}
    />
  )
}

function Tile({
  columnIndex,
  rowIndex,
}: {
  columnIndex: number
  rowIndex: number
}) {
  const dispatch = useAppDispatch()
  const markedPosition = useAppSelector(
    selectMarkedPositionByPosition([columnIndex, rowIndex]),
  )
  const isGameOver = useAppSelector(selectIsGameOver)

  const markType = useMemo(() => {
    const isHit = markedPosition && markedPosition.markedShipId
    const isMiss = markedPosition && !markedPosition.markedShipId

    let markType: MarkType = 'empty'
    if (isHit) {
      markType = 'hit'
    } else if (isMiss) {
      markType = 'miss'
    }
    return markType
  }, [markedPosition])

  const handleTileClick = () => {
    dispatch(markPosition([columnIndex, rowIndex]))
  }

  return (
    <BoardTile
      markType={markType}
      disable={isGameOver || markType !== 'empty'}
      label={`${markType} tile at column ${columnIndex}, row ${rowIndex}`}
      testId={`tileC${columnIndex}R${rowIndex}`}
      onClick={handleTileClick}
    />
  )
}
