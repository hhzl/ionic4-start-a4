import { TestBed } from '@angular/core/testing';

import { WordsDataService } from './words-data.service';

describe('WordsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordsDataService = TestBed.get(WordsDataService);
    expect(service).toBeTruthy();
  });
});
