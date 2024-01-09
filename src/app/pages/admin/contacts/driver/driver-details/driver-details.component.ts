import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse, DriverService, IDriverModel } from 'src/app/services/admin/driver/driver.service';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [    
    CommonModule,
    NgbCollapseModule,
    RouterModule,
  ],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.scss'
})
export class DriverDetailsComponent implements OnInit {
  isCollapsed: boolean;

  driverModel: IDriverModel = { id: 0, name: '', email: '', phone_no: '', customer_id: 0, password: "" };

  constructor(
    private driverApiService: DriverService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.driverModel.id = id;
    this.driverApiService.getDriver(id).subscribe((res: ApiResponse) => {
      this.driverModel = res.data;
      this.changeDetectorRef.detectChanges();
    });
  }

}
