import Position from "./Position";
import Tile from "./Tile";

export default class Grid {
  size : number;
  tiles: Array<Tile> = [];
  availableCells: Array<Position> = [];
  newTiles: Array<Tile> = [];

  constructor(size: number) {
    this.size = size;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.availableCells.push(new Position(i, j));
      }
    }
  }

  inBound(position: Position): boolean {
    return position.row >= 0 &&
      position.row < this.size &&
      position.column >= 0 &&
      position.column < this.size;
  }


  addTile(tile: Tile) {
    this.tiles.push(tile);
    this.availableCells = this.availableCells.filter((cell) => !cell.equal(tile.position));
  }

  removeTile(tile: Tile) {
    this.tiles = this.tiles.filter((t) => t.id !== tile.id);
    this.availableCells.push(tile.position);
  }

  isAvailable(position: Position) {
    for (let i = 0; i < this.availableCells.length; i++) {
      if (this.availableCells[i].equal(position)) {
        return true;
      }
    }
    return false;
  }

  getTileByPosition(position: Position): Tile {
    return this.tiles.filter((tile) => tile.position.equal(position))[0];
  }

  randomAvailableCell(): Position {
    return this.availableCells[Math.floor(Math.random() * this.availableCells.length)];
  }

  hasAvailableCells(): boolean {
    return this.availableCells.length > 0;
  }

}