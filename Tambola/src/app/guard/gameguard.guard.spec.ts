import { TestBed } from '@angular/core/testing';

import { GameguardGuard } from './gameguard.guard';

describe('GameguardGuard', () => {
  let guard: GameguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
