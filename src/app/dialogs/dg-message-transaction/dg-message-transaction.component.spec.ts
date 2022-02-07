import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgMessageTransactionComponent } from './dg-message-transaction.component';

describe('DgMessageTransactionComponent', () => {
  let component: DgMessageTransactionComponent;
  let fixture: ComponentFixture<DgMessageTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgMessageTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgMessageTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
