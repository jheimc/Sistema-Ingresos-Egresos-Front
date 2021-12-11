import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgIncomeComponent } from './dg-income.component';

describe('DgIncomeComponent', () => {
  let component: DgIncomeComponent;
  let fixture: ComponentFixture<DgIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
