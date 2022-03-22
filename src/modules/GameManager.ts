import { stringifyStyle } from "@vue/shared";
import Grid from "./Grid";
import Position from "./Position";
import Tile from "./Tile";

export default class GameManager {

  size     : number  = 4;
  score    : number  = 0;
  grid     : Grid    = new Grid(this.size);
  gameOver : boolean = false;
  shouldAdd: boolean = false;
  

  constructor(size: number = 4) {
    this.size = size;
    this.setup();
  }

  setup(): void {
    this.score    = 0;
    this.gameOver = false;
    this.addRandomTile();
  }

  addRandomTile(): void {
    if (this.grid.hasAvailableCells()) {
      const value: number = Math.random() < 0.7 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);
      this.grid.insertTile(tile);
    }
  }

  getDirection(key: string): Position | undefined {
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
        return undefined;
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

  move(direction: Position): boolean {
    let moved: boolean = false;
    const traversal: Array<Array<number>> = this.buildTraversal(direction);
    traversal[0].forEach((row: number) => {
      traversal[1].forEach((column: number) => {
        const tileToMove = this.grid.cells[row][column];
        if (tileToMove !== null) {
          moved = this.moveTile(tileToMove, direction) || moved;
        }
      });
    });
    return moved;
  }

  moveTile(tile: Tile, direction: Position): boolean{
    let nextPosition: Position = new Position(tile.position.row, tile.position.column);
    let position: Position = new Position(tile.position.row, tile.position.column);
    nextPosition.add(direction);

    while(this.grid.inBound(nextPosition)) {
      console.log(nextPosition.toString());
      const currentTile = this.grid.getTileByPosition(nextPosition);
      console.log(currentTile);
      if (currentTile !== null) {
        if (currentTile.merged === false && currentTile.value === tile.value) {
          tile.merged = true;
          position.add(direction);
        }
        break;
      }
      nextPosition.add(direction);
      position.add(direction);
    }

    // If position changed update the tile and the grid
    if (!position.equal(tile.position)) {
      tile.savePreviousPosition();
      tile.updatePosition(position);
      this.grid.clearTileByPosition(tile.previousPosition);
      this.grid.setTileByPosition(tile, position);
      return true;
    }
    return false;
  }

  merge() {
    this.grid.eachCell((position: Position, tile: Tile) => {
      if (tile !== null && tile.merged) {
        tile.merged = false;
        tile.value  = tile.value * 2;
      }
    });
  }

}