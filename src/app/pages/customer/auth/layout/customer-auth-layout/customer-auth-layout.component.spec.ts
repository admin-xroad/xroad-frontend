import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAuthLayoutComponent } from './customer-auth-layout.component';

describe('CustomerAuthLayoutComponent', () => {
  let component: CustomerAuthLayoutComponent;
  let fixture: ComponentFixture<CustomerAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAuthLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
