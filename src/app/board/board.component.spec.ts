import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { By } from '@angular/platform-browser';
import { Minesweeper } from '../minesweeper/minesweeper';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent]
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
    component.game = new Minesweeper(8, 8, 10);
    fixture.detectChanges();

    const tr = fixture.debugElement.queryAll(By.css('table>tbody>tr'));

    expect(tr.length).toBe(8);
  });
});