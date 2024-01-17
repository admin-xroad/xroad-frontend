import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSaasComponent } from './customer-saas.component';

describe('CustomerSaasComponent', () => {
  let component: CustomerSaasComponent;
  let fixture: ComponentFixture<CustomerSaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSaasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
