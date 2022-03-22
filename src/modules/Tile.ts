import Position from './Position'

export default class Tile {

  position: Position;
  value: number;
  previousPosition: Position;
  merged: boolean;

  constructor(position: Position, value: number) {
    this.position         = position;
    this.value            = value;
    this.previousPosition = position;
    this.merged = false;
  }

  savePreviousPosition(): void {
    this.previousPosition = this.position;
  }

  updatePosition(position: Position): void {
    this.position = position;
  }

}