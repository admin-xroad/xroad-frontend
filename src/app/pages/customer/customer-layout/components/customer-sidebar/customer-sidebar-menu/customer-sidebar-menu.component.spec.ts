import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSidebarMenuComponent } from './customer-sidebar-menu.component';

describe('CustomerSidebarMenuComponent', () => {
  let component: CustomerSidebarMenuComponent;
  let fixture: ComponentFixture<CustomerSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSidebarMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
