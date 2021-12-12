import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgUpdateImageComponent } from './dg-update-image.component';

describe('DgUpdateImageComponent', () => {
  let component: DgUpdateImageComponent;
  let fixture: ComponentFixture<DgUpdateImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgUpdateImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgUpdateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
