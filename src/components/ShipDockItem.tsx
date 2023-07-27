import MissSmall from './../assets/Miss small.png'
import HitSmall from './../assets/Hit small.png'
import CarrierShape from './../assets/Carrier Shape.png'
import BattleshipShape from './../assets/Battleship Shape.png'
import CruiserShape from './../assets/Cruiser Shape.png'
import SubmarineShape from './../assets/Submarine Shape.png'
import AircraftShape from './../assets/Aircraft Shape.png'
import { cs } from '../lib/cssUtils'

interface Props {
  shipId: string
  partsCount: number
  partsHitCount: number
  maxPartsCount: number
}

const shipImageById: { [id: string]: string } = {
  carrier: CarrierShape,
  battleship: BattleshipShape,
  cruiser: CruiserShape,
  submarine: SubmarineShape,
  destroyer: AircraftShape,
}

export default function ShipDockItem(props: Props) {
  const renderMark = (index: number) => {
    if (index >= props.partsCount) {
      return <div></div>
    }

    const markClasses = cs('w-full')

    if (index < props.partsHitCount) {
      return <img alt='hit' src={HitSmall} className={markClasses} />
    }

    return <img alt='miss' src={MissSmall} className={markClasses} />
  }

  return (
    <div
      data-testid={`${props.shipId}Ship`}
      className={cs(
        'flex flex-row justify-start items-center flex-initial w-1/2 desktop:w-full p-1 gap-1 desktop:gap-3',
      )}
    >
      <div className={cs('flex-initial w-1/2')}>
        <img
          alt={`ship ${props.shipId}`}
          className='ship-dock-item__img'
          src={shipImageById[props.shipId]}
        />
      </div>
      <div
        className={cs(
          'flex-initial w-1/2 flex flex-row justify-start items-center gap-1 desktop:gap-3',
        )}
      >
        {[...Array(props.maxPartsCount)].map((_, index) => (
          <div key={index} className={cs('flex-initial w-full')}>
            {renderMark(index)}
          </div>
        ))}
      </div>
    </div>
  )
}
