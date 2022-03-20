import Grid from "./Grid";
import Tile from "./Tile";

export default class GameManager {

  size    : number  = 4;
  score   : number  = 0;
  gameOver: boolean = false;
  won     : boolean = false;
  grid    : Grid    = new Grid(this.size);
  tiles   : Array<Tile> = [];

  constructor(size: number = 4) {
    this.size = size;
  }

  setup(): void {
    this.score    = 0;
    this.gameOver = false;
    this.won      = false;
    this.addRandomTile();
  }

  addRandomTile(): void {
    if (this.grid.hasAvailableCells()) {
      const value: number = Math.random() < 0.7 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);
      this.grid.insertTile(tile);
      this.tiles.push(tile);
    }
  }

}