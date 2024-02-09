import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamListingComponent } from './stream-listing.component';

describe('StreamListingComponent', () => {
  let component: StreamListingComponent;
  let fixture: ComponentFixture<StreamListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
