# Battleship

Here I write down my though process for creating this project.

## Requirements

- should have a board with 10x10 size
- should have ships with various sizes
- ships can be placed in a board horizontally or vertically without overlapping another ship.
- player cannot see the ship placed in the board
- player should choose a board position of their choice then the position will be marked as "hit" or "miss"
- when the entirety of the ship had been hit, the ship should "sunk"
- when all the ships are sunked, the game is over.
- Mobile friendly targetting iPhone 5 screen (320x568) up to a desktop browser screen (1440x1024)

## Out-of-scope

- Multiple players
- Boards with sizes other than 10x10
- Saving and continuing game progress

## States, reducers, methods, types

```javascript
// State
BattleshipGameState
  positionedShips: PositionedShip[]
  markedPositions?: MarkedPosition[]

// Core
[Pure Functions]
start(state: BattleshipGameState): BattleshipGameState
  _validateGame(state: BattleshipGameState)
    throws ShipsOverlappingException when [positionedShips.positions] overlaps with [Board.positionShips]

markPosition(state: BattleshipGameState, payload: MarkPositionPayload): BattleshipGameState

// Getters/Selectors, call everytime the variable is needed, candidate for caching for optimization later
missMarks = markedPositions.filter(markedPosition => markedPosition.markedShipId === null)
hitMarks = markedPositions.filter(markedPosition => markedPosition.markedShipId !== null)
sunkedShips = positionedShips.filter(positionedShip => {
  return positionedShip.positions.every(position => markedPositions.includes(position))
})
isGameOver = sunkedShips.length === positionedShips.length

// Types, Interfaces
MarkPositionPayload
  position: Position

PositionedShip
  shipId: string
  positions: Position[]

MarkedPosition = { position: Position, markedShipId: string }

Position = [x: number, y: number]

MarkResult = "hit" | "miss"

Ship
  id: string
  type: string
  size: number
```

## React Components

```
Page
  BattleshipGame

ContextAwares
  PlayerScoreBoard
  PlayerShipDock
  PlayerTargetRangeBoard

Dumb

  ScoreBoard
  ShipDock
    ShipImage
    ShipPart
  TargetRangeBoard
    BoardTile

Leaf
  Typography
  Border
  Icon
```
