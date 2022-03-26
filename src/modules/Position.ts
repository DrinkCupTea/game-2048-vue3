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

  equal(position: Position): boolean {
    return this.row === position.row && this.column === position.column;
  }

  add(position: Position): void {
      this.row    += position.row;
      this.column += position.column;
  }

  sub(position: Position): void {
      this.row    -= position.row;
      this.column -= position.column;
  }

}