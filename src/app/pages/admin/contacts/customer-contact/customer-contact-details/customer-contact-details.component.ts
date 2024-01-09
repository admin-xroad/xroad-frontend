import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerContactService, ICustomerContactModel, ApiResponse } from 'src/app/services/admin/customer-contact/customer-contact.service';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-contact-details',
  standalone: true,
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule,
  ],
  templateUrl: './customer-contact-details.component.html',
  styleUrl: './customer-contact-details.component.scss'
})
export class CustomerContactDetailsComponent implements OnInit {
  isCollapsed: boolean;

  contactModel: ICustomerContactModel = { id: 0, name: '', email: '', phone: '', customer_id: 0, password: "" };

  constructor(
    private customerContactApiService: CustomerContactService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactModel.customer_id = id;
    this.customerContactApiService.getContact(id).subscribe((res: ApiResponse) => {
      this.contactModel = res.data;
      this.changeDetectorRef.detectChanges();
    });
  }

}
