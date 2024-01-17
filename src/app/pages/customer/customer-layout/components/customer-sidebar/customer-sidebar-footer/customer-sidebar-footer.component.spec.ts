import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSidebarFooterComponent } from './customer-sidebar-footer.component';

describe('CustomerSidebarFooterComponent', () => {
  let component: CustomerSidebarFooterComponent;
  let fixture: ComponentFixture<CustomerSidebarFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSidebarFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSidebarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
