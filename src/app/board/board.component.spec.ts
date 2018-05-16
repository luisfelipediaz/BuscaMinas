import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { By } from '@angular/platform-browser';
import { Minesweeper } from '../minesweeper/minesweeper';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Cell } from '../cell/cell';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a "table"', () => {
    const table = fixture.debugElement.query(By.css('table'));

    expect(table).toBeTruthy();
  });

  it('should render as many "tr" as there are rows in the game', () => {
    component.game = Minesweeper.newBeginersGame();
    fixture.detectChanges();

    const tr = fixture.debugElement.queryAll(By.css('table>tbody>tr'));

    expect(tr.length).toBe(8);
  });


  it('should render 8 td by tr', () => {
    component.game = Minesweeper.newBeginersGame();
    fixture.detectChanges();
    const tds = fixture.debugElement.queryAll(By.css('tr:first-child>td'));

    expect(tds.length).toBe(8);
  });

  it('should render one "cell" component by td', () => {
    component.game = Minesweeper.newBeginersGame();
    fixture.detectChanges();
    const cell = fixture.debugElement.query(By.css('tr:first-child>td>cell'));

    expect(cell).toBeTruthy();
  });

  it('should be "clickCell" call "processBeaten" with correct parameters', () => {
    component.game = Minesweeper.newBeginersGame();
    spyOn(component.game, 'processBeaten');
    component.clickCell(1, 4);

    expect(component.game.processBeaten).toHaveBeenCalledWith({ row: 1, column: 4 });
  });
});
