import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgAddLimitComponent } from './dg-add-limit.component';

describe('DgAddLimitComponent', () => {
  let component: DgAddLimitComponent;
  let fixture: ComponentFixture<DgAddLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgAddLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgAddLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
