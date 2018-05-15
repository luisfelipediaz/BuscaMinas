import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html'
})
export class CellComponent {
  @Input() cell: Cell;
  @Output() clickCell: EventEmitter<Cell> = new EventEmitter<Cell>();

  constructor() { }

  click() {
    if (this.cell.beaten) {
      return;
    }

    this.clickCell.emit(this.cell);
  }
}
