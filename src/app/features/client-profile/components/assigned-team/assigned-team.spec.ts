import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTeam } from './assigned-team';

describe('AssignedTeam', () => {
  let component: AssignedTeam;
  let fixture: ComponentFixture<AssignedTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
