import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountingComponent } from './customer-accounting.component';

describe('CustomerAccountingComponent', () => {
  let component: CustomerAccountingComponent;
  let fixture: ComponentFixture<CustomerAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAccountingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
