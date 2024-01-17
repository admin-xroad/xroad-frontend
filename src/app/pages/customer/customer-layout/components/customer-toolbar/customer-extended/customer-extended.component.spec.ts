import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExtendedComponent } from './customer-extended.component';

describe('CustomerExtendedComponent', () => {
  let component: CustomerExtendedComponent;
  let fixture: ComponentFixture<CustomerExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerExtendedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
