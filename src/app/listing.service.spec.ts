import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListingService', () => {
  let service: ListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
