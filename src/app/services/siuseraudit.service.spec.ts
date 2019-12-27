import { TestBed } from '@angular/core/testing';

import { SiuserauditService } from './siuseraudit.service';

describe('SiuserauditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiuserauditService = TestBed.get(SiuserauditService);
    expect(service).toBeTruthy();
  });
});
