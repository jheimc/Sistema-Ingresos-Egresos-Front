import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgCreateExpenseAccountComponent } from './dg-create-expense-account.component';

describe('DgCreateExpenseAccountComponent', () => {
  let component: DgCreateExpenseAccountComponent;
  let fixture: ComponentFixture<DgCreateExpenseAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgCreateExpenseAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgCreateExpenseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
