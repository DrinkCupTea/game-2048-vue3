export default class Step {
  id        : number;
  tileRow   : number;
  tileColumn: number;
  tileValue : number;
  nextMove  : string = '';

  constructor(id: number, tileRow: number, tileColumn: number, tileValue: number) {
    this.id         = id;
    this.tileRow    = tileRow;
    this.tileColumn = tileColumn;
    this.tileValue  = tileValue;
  }

  addNextMove(key: string) {
    this.nextMove = key;
  }

}