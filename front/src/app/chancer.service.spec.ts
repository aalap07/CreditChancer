import { TestBed } from '@angular/core/testing';

import { ChancerService } from './chancer.service';

describe('ChancerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChancerService = TestBed.get(ChancerService);
    expect(service).toBeTruthy();
  });
});
