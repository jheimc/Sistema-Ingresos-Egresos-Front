import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateUserComponent } from './dg-update-user.component';

describe('DgUpdateUserComponent', () => {
  let component: DgUpdateUserComponent;
  let fixture: ComponentFixture<DgUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
