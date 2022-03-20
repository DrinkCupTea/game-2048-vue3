export default class Position {

  row   : number;
  column: number;

  constructor(row: number, column: number) {
    this.row    = row;
    this.column = column;
  }

  toString(): string {
    return `tile-position-${this.row}-${this.column}`
  }

}