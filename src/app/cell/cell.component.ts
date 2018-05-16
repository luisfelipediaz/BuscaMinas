import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell: Cell;
  @Output() clickCell: EventEmitter<void> = new EventEmitter();

  constructor() { }

  click() {
    if (this.cell.discovered) {
      return;
    }

    this.clickCell.emit();
  }
}
