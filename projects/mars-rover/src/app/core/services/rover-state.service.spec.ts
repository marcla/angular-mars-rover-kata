import { TestBed } from '@angular/core/testing';

import { RoverStateService } from './rover-state.service';

describe('RoverStateService', () => {
  let service: RoverStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoverStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
