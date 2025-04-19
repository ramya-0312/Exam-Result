import { TestBed } from '@angular/core/testing';

import { ViewresultService } from './viewresult.service';

describe('ViewresultService', () => {
  let service: ViewresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
