import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListingComponent } from './driver-listing.component';

describe('DriverListingComponent', () => {
  let component: DriverListingComponent;
  let fixture: ComponentFixture<DriverListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
