import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgCreateIncomeAccountComponent } from './dg-create-income-account.component';

describe('DgCreateIncomeAccountComponent', () => {
  let component: DgCreateIncomeAccountComponent;
  let fixture: ComponentFixture<DgCreateIncomeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgCreateIncomeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgCreateIncomeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
