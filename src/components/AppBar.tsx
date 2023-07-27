import { cs } from '../lib/cssUtils'

export default function AppBar() {
  const boxSize =
    'flex-[0_0_24px] tablet:flex-[0_0_32px] h-[24px] tablet:h-[32px]'

  return (
    <div
      className={cs('bg-violet-300 px-2 py-1 tablet:py-2 flex flex-row gap-2')}
    >
      <div
        className={cs(
          boxSize,
          'flex-[0_0_38px] tablet:flex-[0_0_48px] bg-gray-700',
        )}
      ></div>
      <div className={cs('flex-1 flex flex-row desktop:gap-2')}>
        <div
          className={cs(
            boxSize,
            'flex-1 tablet:flex-1 desktop:flex-1 bg-white',
          )}
        ></div>
        <div
          className={cs(
            boxSize,
            'tablet:flex-[0_0_32px] desktop:flex-[0_0_80px] bg-violet-900 opacity-50',
          )}
        ></div>
      </div>
      <div className={cs(boxSize, 'bg-gray-700')}></div>
      <div className={cs(boxSize, 'bg-gray-700 hidden desktop:block')}></div>
      <div className={cs(boxSize, 'bg-gray-700 hidden desktop:block')}></div>
    </div>
  )
}
