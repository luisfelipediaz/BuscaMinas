import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';
import { By } from '@angular/platform-browser';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be render a p element with class content', () => {
    const pElement = fixture.debugElement.query(By.css('p[class="content"]'));

    expect(pElement).toBeTruthy();
  });

  it('should on click p element call "clickCell"', () => {
    spyOn(component, 'clickCell');
    const pElement = fixture.debugElement.query(By.css('p[class="content"]'));

    pElement.nativeElement.click();

    expect(component.clickCell).toHaveBeenCalled();
  });
});
