import { TestBed } from '@angular/core/testing';

import { ServiceLcService } from './service-lc.service';

describe('ServiceLcService', () => {
  let service: ServiceLcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
