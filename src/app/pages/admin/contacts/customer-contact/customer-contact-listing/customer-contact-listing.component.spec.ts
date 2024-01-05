import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactListingComponent } from './customer-contact-listing.component';

describe('CustomerContactListingComponent', () => {
  let component: CustomerContactListingComponent;
  let fixture: ComponentFixture<CustomerContactListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerContactListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
