import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { HttpClientModule } from '@angular/common/http';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // acceptance test
  it('should fill stream array with multiple results when there is no text input', () => {
    component.filterResults('');
    expect(component.streamListingList.length).toBeGreaterThanOrEqual(1);
  });

  // acceptance test
  it('should fill stream array with nothing when the input is foobar', () => {
    component.filterResults('foobar');
    expect(component.streamListingList.length).toBe(0);
  });

  // acceptance test
  it('should fill stream array with results that match the filter query', () => {
    const testQuery = 'Test';
    component.filterResults(testQuery);
    expect(component.streamListingList[0].title).toContain(testQuery);
  });

   // integration test - Gallery Component and Stream Listing Component
   it('should load the stream listing component', () => {
    const streamComp = fixture.debugElement.nativeElement.querySelector('app-stream-listing');
    expect(streamComp).toBeTruthy();
  })


});
