import { TestBed } from '@angular/core/testing';

import { CustomerContactService } from './customer-contact.service';

describe('CustomerContactService', () => {
  let service: CustomerContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
