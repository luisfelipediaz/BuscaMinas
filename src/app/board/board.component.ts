import { Component, OnInit, Input } from '@angular/core';
import { Minesweeper } from '../minesweeper/minesweeper';
import { Cell } from '../cell/cell';

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() game: Minesweeper;

  constructor() { }

  ngOnInit() {
  }

  clickCell(row: number, column: number) {
    this.game.processBeaten({ row, column });
  }
}
