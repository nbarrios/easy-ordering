import { TestBed } from '@angular/core/testing';

import { ListProviderService } from './list-provider.service';

describe('ListProviderService', () => {
  let service: ListProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
