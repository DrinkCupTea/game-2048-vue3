import { Guid } from 'guid-typescript';
import Position from './Position';

export default class Tile {

  static ANIMATION_NONE  : string = '';
  static ANIMATION_APPEAR: string = 'appear';

  id           : string;
  value        : number;

  mergedOut: boolean;
  mergedIn : boolean;

  show         : boolean;
  animationName: string;

  position: Position;
  leaveAt : Position;

  constructor(position: Position, value: number) {
    this.id       = Guid.create().toString();
    this.value    = value;

    this.mergedOut = false;
    this.mergedIn  = false;

    this.show     = true;
    this.animationName = Tile.ANIMATION_NONE;

    this.position = position;
    this.leaveAt  = position;
  }

  shouldMove(): boolean {
    return !this.position.equal(this.leaveAt);
  }

  leaveGrid(): void {
    if (this.position.row !== this.leaveAt.row) {
      this.animationName = `row-from-${this.position.row}-to-${this.leaveAt.row}`;
    }
    if (this.position.column !== this.leaveAt.column) {
      this.animationName = `column-from-${this.position.column}-to-${this.leaveAt.column}`;
    }
    this.show = false;
  }

  merge(): void {
    this.mergedIn = false;
    this.value *= 2;
  }

}