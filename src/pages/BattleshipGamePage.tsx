import { useEffect } from 'react'
import AppBar from '../components/AppBar'
import PlayerScoreBoard from '../components/PlayerScoreBoard'
import PlayerShipDock from '../components/PlayerShipDock'
import PlayerTargetRangeBoard from '../components/PlayerTargetRangeBoard'
import { cs } from '../lib/cssUtils'
import {
  selectIsGameOver,
  start,
} from '../store/battleshipGame/battleshipGameSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { startingGameData } from './startingGameData'

export default function BattleshipGamePage() {
  const dispatch = useAppDispatch()
  const isGameOver = useAppSelector(selectIsGameOver)

  useEffect(() => {
    dispatch(start(startingGameData))
  }, [])

  useEffect(() => {
    if (!isGameOver) {
      return
    }
    if (confirm('Game over. Start again?')) {
      dispatch(start(startingGameData))
    }
  }, [isGameOver])

  return (
    <div
      className={cs(
        'flex flex-col overflow-hidden',
        'min-h-[568px]',
        'tablet:max-h-[1024px]',
        'desktop:max-h-[1024px]',
      )}
    >
      <AppBar />
      <div
        className={cs(
          'overflow-hidden',
          'flex-[1_1_auto] flex flex-col w-full max-w-[480px] mx-auto',
          'tablet:flex-[1_1_auto] tablet:max-w-[768px] tablet:p-4',
          'desktop:w-full desktop:max-w-[1280px] desktop:flex-row-reverse',
        )}
      >
        <div className={cs('flex-[0_0_auto]', 'desktop:flex-[1_0_600px]')}>
          <PlayerTargetRangeBoard />
        </div>
        <div
          className={cs(
            'flex-[1_1_100%] flex flex-col',
            'tablet:flex tablet:flex-row tablet:flex-[0_0_100%] tablet:overflow-hidden tablet:py-8',
            'desktop:flex desktop:flex-col desktop:flex-[0_0_404px] desktop:px-2 desktop:py-0',
          )}
        >
          <div
            className={cs(
              'flex-[0_0_auto]',
              'tablet:flex tablet:flex-[0_0_auto]',
              'desktop:flex desktop:flex-[0_0_auto] desktop:flex-row',
            )}
          >
            <PlayerScoreBoard />
          </div>
          <div
            className={cs(
              'flex-[0_0_108px] max-w-[375px] mx-auto flex overflow-hidden p-2',
              'tablet:flex-[1_1_100%] tablet:max-w-none tablet:m-0 tablet:max-h-[126px] tablet:py-0',
              'desktop:max-h-none desktop:py-6 desktop:px-2',
            )}
          >
            <PlayerShipDock />
          </div>
        </div>
      </div>
    </div>
  )
}
