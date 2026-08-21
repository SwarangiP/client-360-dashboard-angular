import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookPanel } from './workbook-panel';

describe('WorkbookPanel', () => {
  let component: WorkbookPanel;
  let fixture: ComponentFixture<WorkbookPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkbookPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbookPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
