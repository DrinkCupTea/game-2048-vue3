import Position from './Position'

export default class Tile {

  position: Position;
  value: number;
  previousPosition: Position | null;
  merged: boolean;

  constructor(position: Position, value: number) {
    this.position         = position;
    this.value            = value;
    this.previousPosition = null;
    this.merged = false;
  }

  savePosition(): void {
    this.previousPosition = this.position;
  }

  updatePosition(position: Position): void {
    this.position = position;
  }

}