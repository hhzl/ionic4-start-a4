import { TestBed } from '@angular/core/testing';

import { LWdbService } from './lwdb.service';

describe('LWdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LWdbService = TestBed.get(LWdbService);
    expect(service).toBeTruthy();
  });
});
