import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerptComponent } from './invoicerpt.component';

describe('InvoicerptComponent', () => {
  let component: InvoicerptComponent;
  let fixture: ComponentFixture<InvoicerptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicerptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
