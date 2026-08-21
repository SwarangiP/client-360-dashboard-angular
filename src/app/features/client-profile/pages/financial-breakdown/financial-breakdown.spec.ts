import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBreakdown } from './financial-breakdown';

describe('FinancialBreakdown', () => {
  let component: FinancialBreakdown;
  let fixture: ComponentFixture<FinancialBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialBreakdown],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
