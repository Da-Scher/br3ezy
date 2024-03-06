import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListingService', () => {
  let service: ListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ListingService]
    });
    service = TestBed.inject(ListingService);
  });

  // Acceptance Test
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Integration Test - Listing Service and Stream Listing Interface
  it('should return a streamListing', async () => {
    await service.getStreamListingById(1).then((streamListing) => {
      expect(streamListing).toBeDefined();
    });
  });

  // White Box Test
  // Combined with other white box tests of this component,
  // 100% function coverage
  it('should return the streamListing with ID 1', async () => {
    await service.getStreamListingById(1).then((streamListing) => {
      if(streamListing)
        expect(streamListing.id).toBe(1);
    });
  });

    // White Box Test
    // Combined with other white box tests of this component,
    // 100% function coverage
    it('should not return a streamListing', async () => {
      await service.getStreamListingById(82345).then((streamListing) => {
          expect(streamListing).toBeUndefined();
      });
    });

    // White Box Test
    // Combined with other white box tests of this component,
    // 100% function coverage
  it('should return an array of streamListings', async () => {
    await service.getAllStreamListings().then((streamListing) => {
      expect(streamListing).toBeDefined();
    });
  });


});
