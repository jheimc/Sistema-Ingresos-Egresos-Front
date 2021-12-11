import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncomePageComponent } from './report-income-page.component';

describe('ReportIncomePageComponent', () => {
  let component: ReportIncomePageComponent;
  let fixture: ComponentFixture<ReportIncomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIncomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
