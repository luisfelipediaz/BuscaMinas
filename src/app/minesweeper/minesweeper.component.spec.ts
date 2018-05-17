import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MinesweeperComponent } from './minesweeper.component';
import { Minesweeper } from './minesweeper';

describe('MinesweeperComponent', () => {
  let component: MinesweeperComponent;
  let fixture: ComponentFixture<MinesweeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinesweeperComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be render a "board" component', () => {
    const board = fixture.debugElement.query(By.css('board'));

    expect(board).toBeTruthy();
  });

  it('should be render a button with name "restart"', () => {
    const button = fixture.debugElement.query(By.css('button[name="restart"]'));

    expect(button).toBeTruthy();
  });

  it('should be "button" click call "restart"', () => {
    spyOn(component, 'restart');
    const button = fixture.debugElement.query(By.css('button[name="restart"]'));

    button.nativeElement.click();

    expect(component.restart).toHaveBeenCalled();
  });

  it('should be "restart" call Minesweeper.newBeginersGame and assign tu game', () => {
    spyOn(Minesweeper, 'newBeginersGame').and.returnValue('test');

    component.restart();

    expect(Minesweeper.newBeginersGame).toHaveBeenCalled();
    expect(component.game).toBe(<any>'test');
  });
});
