import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileSkeleton } from './client-profile-skeleton';

describe('ClientProfileSkeleton', () => {
  let component: ClientProfileSkeleton;
  let fixture: ComponentFixture<ClientProfileSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientProfileSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientProfileSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
