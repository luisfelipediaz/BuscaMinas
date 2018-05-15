import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';
import { By } from '@angular/platform-browser';
import { Cell } from './cell';
import { EventEmitter } from '@angular/core';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let cell: Cell;

  beforeEach(async(() => {
    cell = {
      beaten: false,
      isMine: false,
      probability: 4
    };

    TestBed.configureTestingModule({
      declarations: [CellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell = cell;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be default value of "clickCell" new EventEmmiter', () => {
    expect(component.clickCell instanceof EventEmitter).toBeTruthy();
  });

  it('should be render a div element with class content', () => {
    const pElement = fixture.debugElement.query(By.css('div[class="content"]'));

    expect(pElement).toBeTruthy();
  });

  it('should on click p element call "click"', () => {
    spyOn(component, 'click');
    const pElement = fixture.debugElement.query(By.css('div[class="content"]'));

    pElement.nativeElement.click();

    expect(component.click).toHaveBeenCalled();
  });

  it('should "click" call output "clickCell" with correct parametter', () => {
    let actual: Cell;
    component.clickCell.subscribe((cellClicked: Cell) => {
      actual = cellClicked;
    });

    component.click();

    expect(actual).toEqual(cell);
  });

  it('should when cell.beaten the "click" function not call EventEmitter "clickCell"', () => {
    let called = false;

    component.clickCell.subscribe(() => called = true);

    component.cell.beaten = true;
    component.click();

    expect(called).toBeFalsy();
  });

  it('should be render probability when cell is beaten and not is mine', () => {
    component.cell.beaten = true;
    fixture.detectChanges();

    const probability = fixture.debugElement.query(By.css('div>h3'));

    expect(probability).toBeTruthy();
    expect(probability.nativeElement.textContent).toBe(`${cell.probability}`);
  });
});
