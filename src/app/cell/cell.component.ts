import { Component, OnInit, Input } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html'
})
export class CellComponent {
  @Input() cell: Cell;

  constructor() { }

  clickCell() {
  }
}
