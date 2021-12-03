import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgRegisterUserComponent } from './dg-register-user.component';

describe('DgRegisterUserComponent', () => {
  let component: DgRegisterUserComponent;
  let fixture: ComponentFixture<DgRegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgRegisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
