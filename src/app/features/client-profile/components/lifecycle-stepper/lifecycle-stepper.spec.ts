import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleStepper } from './lifecycle-stepper';

describe('LifecycleStepper', () => {
  let component: LifecycleStepper;
  let fixture: ComponentFixture<LifecycleStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
