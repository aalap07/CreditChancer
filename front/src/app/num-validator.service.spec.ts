import { TestBed } from '@angular/core/testing';

import { NumValidatorService } from './num-validator.service';

describe('NumValidatorService', () => {
  let service: NumValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
