import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgExpenseComponent } from './dg-expense.component';

describe('DgExpenseComponent', () => {
  let component: DgExpenseComponent;
  let fixture: ComponentFixture<DgExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
