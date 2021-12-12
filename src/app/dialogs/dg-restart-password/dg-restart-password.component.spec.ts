import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgRestartPasswordComponent } from './dg-restart-password.component';

describe('DgRestartPasswordComponent', () => {
  let component: DgRestartPasswordComponent;
  let fixture: ComponentFixture<DgRestartPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgRestartPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgRestartPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
