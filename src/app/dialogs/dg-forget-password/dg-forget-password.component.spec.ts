import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgForgetPasswordComponent } from './dg-forget-password.component';

describe('DgForgetPasswordComponent', () => {
  let component: DgForgetPasswordComponent;
  let fixture: ComponentFixture<DgForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
