import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSidebarLogoComponent } from './customer-sidebar-logo.component';

describe('CustomerSidebarLogoComponent', () => {
  let component: CustomerSidebarLogoComponent;
  let fixture: ComponentFixture<CustomerSidebarLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSidebarLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSidebarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
