import Grid from "./Grid";
import Position from "./Position";
import Tile from "./Tile";

export default class GameManager {

  size     : number;
  score    : number;
  grid     : Grid;
  gameOver : boolean;

  numOfMovingTiles: number  = 0;
  isMoving        : boolean = false;

  
  constructor(size: number = 4) {
    this.size     = size;
    this.score    = 0;
    this.grid     = new Grid(this.size);
    this.gameOver = false;
    this.setup();
  }

  setup(): void {
    this.score    = 0;
    this.gameOver = false;
    this.grid.tiles = [];
    this.addRandomTile();
  }

  addRandomTile(): void {
    if (this.grid.hasAvailableCells()) {
      const position: Position = this.grid.randomAvailableCell();
      const value: number      = Math.random() < 0.7 ? 2 : 4;
      const tile : Tile        = new Tile(position, value);
      tile.show = false;
      tile.animationName = Tile.ANIMATION_APPEAR;
      this.grid.addTile(tile);
      tile.show = true;

      this.gameOver = this.ifGameOver();
    }
  }

  getDirection(key: string): Position {
    let direction: Position = new Position(0, 0);
    switch (key) {
      case 'ArrowUp':
        direction.row = -1;
        break;
      case 'ArrowDown':
        direction.row = 1;
        break;
      case 'ArrowLeft':
        direction.column = -1;
        break;
      case 'ArrowRight':
        direction.column= 1;
        break;
      default:
        console.error("Game Managere getDirection() should not accept key ", key);
        return direction;
    }
    return direction;
  }

  buildTraversal(direction: Position) {
    let traversal: Array<Array<number>> = [];
    for (let i = 0; i < 2; i++) {
      traversal.push([]);
      for (let j = 0; j < this.size; j++) {
        traversal[i].push(j);
      }
    }
    // If move down, start from bottom
    if (direction.row    === 1) {traversal[0].reverse();}
    // If move right, start from right side 
    if (direction.column === 1) {traversal[1].reverse();}
    return traversal;
  }

  move(key: string): void {
    if (this.isMoving) {
      console.warn('Is Moving!');
      return;
    };
    this.isMoving = true;
    const direction = this.getDirection(key);
    const traversal: Array<Array<number>> = this.buildTraversal(direction);
    this.moveAction(direction, traversal);
    this.moveAnimation();
  }

  moveAction(direction: Position, traversal: Array<Array<number>>): void{
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const currentPosition = new Position(traversal[0][row], traversal[1][column]);
        if (!this.grid.isAvailable(currentPosition)) {
          const tile = this.grid.getTileByPosition(currentPosition);
          if (tile instanceof Tile) {
            this.getMoveTo(tile, direction);
          }
        }
      }
    }
  }

  getMoveTo(tile: Tile, direction: Position) {
    const moveTo = new Position(tile.position.row, tile.position.column);
    // Start from next position
    moveTo.add(direction);
    // Move until invalid
    while (this.grid.inBound(moveTo) && this.grid.isAvailable(moveTo)) {
      moveTo.add(direction);
    }

    if (this.grid.inBound(moveTo)) {
      // Move stopped because meet other tile
      const otherTile = this.grid.getTileByPosition(moveTo);
      moveTo.row = otherTile.leaveAt.row;
      moveTo.column = otherTile.leaveAt.column;
      // If other tile is not merged and can merge to it
      if (!otherTile.mergedOut && !otherTile.mergedIn && otherTile.value === tile.value) {
        // Can merge
        // Set merge flag
        tile.mergedOut = true;
        otherTile.mergedIn = true;
      } else {
        // Can not merge
        // step back
        moveTo.sub(direction);
      }
    } else {
      // Move stopped because out of bound
      // Step back
      moveTo.sub(direction);
    }

    tile.leaveAt = moveTo;
  }

  moveAnimation() {
    this.grid.tiles.forEach((curTile) => {
      if (curTile.shouldMove()) {
        this.numOfMovingTiles += 1;
        curTile.leaveGrid();
      } else {
        this.grid.newTiles.push(curTile);
      }
    });
    if (this.numOfMovingTiles === 0) {
      this.grid.newTiles = [];
      this.isMoving = false;
    }
  }

  afterMove(tile: Tile) {
    if (!tile.mergedOut) {
      const newTile = new Tile(tile.leaveAt, tile.value);
      newTile.mergedIn = tile.mergedIn;
      this.grid.newTiles.push(newTile);
    }

    this.numOfMovingTiles -= 1;
    if (this.numOfMovingTiles === 0) {
      this.afterAllMoving();
    }
  }

  afterAllMoving() {
    let curTile = this.grid.tiles.shift();
    while(curTile instanceof Tile) {
      this.grid.removeTile(curTile);
      curTile = this.grid.tiles.shift();
    }

    curTile = this.grid.newTiles.shift();
    while (curTile instanceof Tile) {
      this.grid.addTile(curTile);
      curTile = this.grid.newTiles.shift();
    }

    this.grid.tiles.forEach((t) => {
      if (t.mergedIn) {
        t.merge();
        this.score += t.value;
      }
    });
    this.addRandomTile();
    this.isMoving = false;
  }

  ifGameOver(): boolean {
    if (this.grid.hasAvailableCells()) {
      return false;
    }

    let isOver = true;
    this.grid.tiles.forEach((tile) => {
      if (this.canMergeToAround(tile)) {
        isOver = false;
      }
    });
    return isOver;
  }

  canMergeToAround(tile: Tile): boolean {
    // Check around with four direction
    const dirs: Array<Array<number>> = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (let i = 0; i < 4; i++) {
      const position: Position = new Position(tile.position.row + dirs[i][0], tile.position.column + dirs[i][1]);
      if (this.grid.inBound(position) && this.grid.getTileByPosition(position).value === tile.value) {
        // If can merge to around return true
        return true;
      }
    }
    return false;
  }

}