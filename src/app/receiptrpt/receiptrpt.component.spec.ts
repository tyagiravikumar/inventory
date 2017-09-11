import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptrptComponent } from './receiptrpt.component';

describe('ReceiptrptComponent', () => {
  let component: ReceiptrptComponent;
  let fixture: ComponentFixture<ReceiptrptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptrptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
