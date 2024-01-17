import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPageTitleComponent } from './customer-page-title.component';

describe('CustomerPageTitleComponent', () => {
  let component: CustomerPageTitleComponent;
  let fixture: ComponentFixture<CustomerPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPageTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
