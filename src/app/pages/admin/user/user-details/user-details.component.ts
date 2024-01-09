import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse, IUserModel, UserService } from 'src/app/services/admin/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

  isCollapsed: boolean;

  user: IUserModel = { id: 0, name: '', email: '', };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((res: ApiResponse) => {
      this.user = res.data;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
  }

}
