import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../../../services/admin/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AdminAuthGuard  {
  constructor(private authService: AuthService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser) {
    //   // logged in so return true
    //   return true;
    // }

    // alert(this.router.url);
    if(this.authService.isAdminLoggedIn()){
      // alert('dno');
      return true;
    }else{
      // alert('dno1');

      this.router.navigate(['/admin/auth/login']);
    }
    // not logged in so redirect to login page with the return url
    // this.authService.logout();
    // return false;
  }
}
