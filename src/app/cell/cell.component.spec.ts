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
      discovered: false,
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

  it('should "click" call output "clickCell"', () => {
    let called: boolean;
    component.clickCell.subscribe(() => {
      called = true;
    });

    component.click();

    expect(called).toBeTruthy();
  });

  it('should when cell.discovered the "click" function not call EventEmitter "clickCell"', () => {
    let called = false;

    component.clickCell.subscribe(() => called = true);

    component.cell.discovered = true;
    component.click();

    expect(called).toBeFalsy();
  });

  it('should be render probability if cell is discovered and not is mine', () => {
    component.cell.discovered = true;
    fixture.detectChanges();

    const probability = fixture.debugElement.query(By.css('div>h3'));

    expect(probability).toBeTruthy();
    expect(probability.nativeElement.textContent).toBe(`${cell.probability}`);
  });

  it('should be NOT render probability if cell not discovered and not is mine', () => {
    component.cell.discovered = false;
    fixture.detectChanges();

    const probability = fixture.debugElement.query(By.css('div>h3'));

    expect(probability).toBeFalsy();
  });

  it('should be render a span with "mine" class if cell is discovered and is mine', () => {
    component.cell.isMine = true;
    component.cell.discovered = true;
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('div[class*="content"]'));
    const mine = content.query(By.css('span[class="mine"]'));

    expect(mine).toBeTruthy();
  });

  it('should be NOT render a span with "mine" class if cell is NOT discovered and is mine', () => {
    component.cell.isMine = true;
    component.cell.discovered = false;
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('div[class*="content"]'));
    const mine = content.query(By.css('div>span[class="mine"]'));

    expect(mine).toBeFalsy();
  });

  it('should add class "discovered" to div content when cell is discovered', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.discovered = true;
    fixture.detectChanges();

    expect(content.nativeElement.classList).toContain('discovered');
  });

  it('should add class "mine" to div content when cell is discovered and is mine', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.discovered = true;
    component.cell.isMine = true;
    fixture.detectChanges();

    expect(content.nativeElement.classList).toContain('mine');
  });

  it('should NOT add class "mine" to div content when cell is discovered but not is mine', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.discovered = true;
    component.cell.isMine = false;
    fixture.detectChanges();

    expect(content.nativeElement.classList).not.toContain('mine');
  });

  it('should NOT add class "mine" to div content when cell is NOT discovered and is mine', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.discovered = false;
    component.cell.isMine = true;
    fixture.detectChanges();

    expect(content.nativeElement.classList.length).toBe(1);
  });

  it('should add class "beaten" to div content when cell is beaten', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.beaten = true;
    fixture.detectChanges();

    expect(content.nativeElement.classList).toContain('beaten');
  });

  it('should NOT add class "beaten" to div content when cell is NOT beaten', () => {
    const content = fixture.debugElement.query(By.css('div'));

    component.cell.beaten = false;
    fixture.detectChanges();

    expect(content.nativeElement.classList).not.toContain('beaten');
  });
});
