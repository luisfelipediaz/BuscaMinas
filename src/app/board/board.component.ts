import { Component, Input } from '@angular/core';
import { Minesweeper } from '../minesweeper/minesweeper';
import { Cell } from '../cell/cell';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent {
  @Input() game: Minesweeper;

  constructor() { }

  clickCell(row: number, column: number) {
    this.game.processBeaten({ row, column });
  }

  markCell(row: number, column: number) {
    this.game.processMark({ row, column });
  }
}
