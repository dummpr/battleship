import { cs } from '../lib/cssUtils'
import HitImage from './../assets/Hit.png'
import MissImage from './../assets/Miss.png'

export type MarkType = 'hit' | 'miss' | 'empty'

interface Props {
  markType?: MarkType
  onClick: () => void
  label: string
  testId?: string
  disable?: boolean
}

export default function BoardTile({
  markType = 'empty',
  onClick,
  label,
  testId,
  disable,
}: Props) {
  return (
    <button
      aria-label={label}
      onClick={disable ? undefined : onClick}
      className={cs(
        'border-gray aspect-square w-full max-w-[100px] cursor-auto max-h-[100px] bg-white',
        {
          'hover:bg-gray-200 cursor-pointer': !disable,
        },
      )}
      data-testid={testId}
    >
      {markType === 'hit' && (
        <img role='presentation' className='w-full' src={HitImage} />
      )}
      {markType === 'miss' && (
        <img
          role='presentation'
          className='board-tile__image'
          src={MissImage}
        />
      )}
    </button>
  )
}
