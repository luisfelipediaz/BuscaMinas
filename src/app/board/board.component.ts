import { Component, OnInit, Input } from '@angular/core';
import { Minesweeper } from '../minesweeper/minesweeper';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() game: Minesweeper;

  constructor() { }

  ngOnInit() {
  }

}
