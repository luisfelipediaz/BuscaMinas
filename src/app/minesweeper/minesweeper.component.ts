import { Component, OnInit } from '@angular/core';
import { Minesweeper } from './minesweeper';

@Component({
  selector: 'minesweeper',
  templateUrl: './minesweeper.component.html'
})
export class MinesweeperComponent implements OnInit {
  game: Minesweeper;

  constructor() { }

  ngOnInit() {
    this.game = Minesweeper.newBeginersGame();
  }

  restart() {
    this.game = Minesweeper.newBeginersGame();
  }
}
