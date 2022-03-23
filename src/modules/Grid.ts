import Position from "./Position";
import Tile from "./Tile";

interface Callback {
  (tile: Tile | null, position: Position): void;
}

export default class Grid {
  size : number;
  cells: Array<Array<Tile | null>> = [];

  constructor(size: number) {
    this.size = size;
    this.build();
  }

  build(): void {
    for (let x = 0; x < this.size; x++) {
      this.cells[x] = [];
      for (let y = 0; y < this.size; y++) {
        this.cells[x].push(null);
      }
    }
  }

  inBound(position: Position): boolean {
    return position.row >= 0 &&
      position.row < this.size &&
      position.column >= 0 &&
      position.column < this.size;
  }

  insertTile(tile: Tile): void {
    this.cells[tile.position.row][tile.position.column] = tile;
  }

  getTileByPosition(position: Position): Tile | null {
    return this.cells[position.row][position.column];
  }

  clearTileByPosition(position: Position): void {
    this.cells[position.row][position.column] = null;
  }

  randomAvailableCell(): Position {
    const cells: ReadonlyArray<Position> = this.availableCells();
    return cells[Math.floor(Math.random() * cells.length)];
  }

  availableCells(): Array<Position> {
    let cells: Array<Position> = [];
    this.eachCell((tile, position) => {
      if (!(tile instanceof Tile)) {
        cells.push(position);
      }
    });
    return cells;
  }

  eachCell(callback: Callback): void {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        callback(this.cells[row][column], new Position(row, column));
      }
    }
  }

  hasAvailableCells(): boolean {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        if (!(this.cells[row][column] instanceof Tile)) {
          return true;
        }
      }
    }
    return false;
  }

  clearCells(): void {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        this.cells[row][column] = null;
      }
    }
  }

}