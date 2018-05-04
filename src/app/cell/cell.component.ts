import { Component, OnInit, Input } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell: Cell;

  constructor() { }
}
