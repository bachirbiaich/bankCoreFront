import { TestBed, inject } from '@angular/core/testing';

import { VirementService } from './virement.service';

describe('VirementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VirementService]
    });
  });

  it('should be created', inject([VirementService], (service: VirementService) => {
    expect(service).toBeTruthy();
  }));
});
