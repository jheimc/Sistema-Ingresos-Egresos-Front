import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgMessageComponent } from './dg-message.component';

describe('DgMessageComponent', () => {
  let component: DgMessageComponent;
  let fixture: ComponentFixture<DgMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
