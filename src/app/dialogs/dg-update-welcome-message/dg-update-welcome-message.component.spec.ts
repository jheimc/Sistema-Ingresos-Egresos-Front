import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateWelcomeMessageComponent } from './dg-update-welcome-message.component';

describe('DgUpdateWelcomeMessageComponent', () => {
  let component: DgUpdateWelcomeMessageComponent;
  let fixture: ComponentFixture<DgUpdateWelcomeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateWelcomeMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateWelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
