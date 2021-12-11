import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExpensePageComponent } from './report-expense-page.component';

describe('ReportExpensePageComponent', () => {
  let component: ReportExpensePageComponent;
  let fixture: ComponentFixture<ReportExpensePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportExpensePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExpensePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
