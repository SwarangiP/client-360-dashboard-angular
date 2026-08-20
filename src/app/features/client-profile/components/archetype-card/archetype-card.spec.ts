import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchetypeCard } from './archetype-card';

describe('ArchetypeCard', () => {
  let component: ArchetypeCard;
  let fixture: ComponentFixture<ArchetypeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchetypeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchetypeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
