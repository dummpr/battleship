import { cs } from '../lib/cssUtils'
import { toScoreFormat } from '../lib/stringUtils'

interface Props {
  player1Name: string
  player1Score: number
  player2Name: string
  player2Score: number
}

export default function ScoreBoard(props: Props) {
  return (
    <div className='flex flex-row w-full'>
      <PlayerBoard
        name={props.player1Name}
        score={props.player1Score}
        className='bg-orange'
      />
      <PlayerBoard
        name={props.player1Name}
        score={props.player1Score}
        className='bg-teal'
      />
    </div>
  )
}

interface PlayerBoardProps {
  name: string
  score: number
  className?: string
}

function PlayerBoard(props: PlayerBoardProps) {
  return (
    <div
      className={cs(
        'flex-1 p-2 min-w-[100px] flex flex-col justify-center',
        props.className,
      )}
    >
      <div
        className={cs(
          'text-gray-700 text-4xl font-bold flex flex-row items-center justify-center pt-1 pb-3 border-b-gray-700 border-b-2',
        )}
      >
        {toScoreFormat(props.score)}
      </div>
      <div
        className={cs(
          'text-gray-700 text-base font-bold flex flex-row items-center justify-center pt-1',
        )}
      >
        {props.name}
      </div>
    </div>
  )
}
