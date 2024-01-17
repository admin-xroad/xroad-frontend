import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScriptsInitComponent } from './customer-scripts-init.component';

describe('CustomerScriptsInitComponent', () => {
  let component: CustomerScriptsInitComponent;
  let fixture: ComponentFixture<CustomerScriptsInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerScriptsInitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerScriptsInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
