import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, from, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthHTTPService } from 'src/app/modules/auth/services/auth-http';
import { LoginModel } from 'src/app/pages/admin/models/login.model';
import { UserModel } from 'src/app/modules/auth';
import { HttpClient } from '@angular/common/http';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})



export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  
  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    
  }

  // public methods


  login(email: string, password: string): any {
    console.log('should go');
    const loginData = { email, password };
    const loginUrl = `http://127.0.0.1:8000/api/admin/v1/login`;

    return this.http.post<any>(loginUrl, loginData).pipe(
      map((data: any)=>{
        if(data.status==true){
          this.setAuthFromLocalStorage(data.data.auth_token);
          return { success: true, data: data};
        }else{
          return { success: false, data: data};
        }
      }),
    );


    // return this.authHttpService.login(email, password).pipe(
    //   map((auth: LoginModel) => {
    //     const result = this.setAuthFromLocalStorage(auth.data.auth_token);
    //     return result;
    //   }),
    //   switchMap(() => this.getUserByToken()),
    //   catchError((err) => {
    //     console.error('err', err);
    //     return of(undefined);
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );


   


    // console.log('works done');
    // this.isLoadingSubject.next(true);
    // return this.authHttpService.login(email, password).pipe(
    //   tap((user: any) => {
    //     console.log(user.authToken);
       
    //   })
    // );
  }





  // login(email: string, password: string): Observable<UserType> {
  //   console.log('works done');
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.login(email, password).pipe(
  //     map((auth: LoginModel) => {
  //       const result = this.setAuthFromLocalStorage(auth);
  //       return result;
  //     }),
  //     switchMap(() => this.getUserByToken()),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }



  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(`http://127.0.0.1:8000/api/admin/v1/login`,  {email:email,password:password}).pipe(

  //     map((data: any) => data),
  //     switchMap(data => {
  //       console.log(data.data.auth_token);
  //       this.setAuthFromLocalStorage(data.data.auth_token);
  //       return data;
  //       // this.auth = JSON.stringify(data);
  //       // return from(Storage.set({ key: AUTH_DATA, value: JSON.stringify(data) }));
  //     }),
      
  //   );


    // this.http.post<LoginModel>(`http://127.0.0.1:8000/api/admin/v1/login`, {email:email,password:password}).pipe(first()).subscribe(res()=>{

    // });
  


    // const d = this.http.post<LoginModel>(`http://127.0.0.1:8000/api/admin/v1/login`, {
    //   email,
    //   password,
    // }).pipe(map(data:any)=>data{

    // });
    // return d;
  // }
  

  // login(email: string, password: string): Observable<UserType> {
  //   console.log('works done');
  //   this.isLoadingSubject.next(true);
  //   this.http.post('http://127.0.0.1:8000/api/admin/v1/login')<LoginModel>
  //   return this.authHttpService.login(email, password).pipe(
  //     map((auth: LoginModel) => {
  //       const result = this.setAuthFromLocalStorage(auth);
  //       return result;
  //     }),
  //     switchMap(() => this.getUserByToken()),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }





  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: string): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth) {
      localStorage.setItem(this.authLocalStorageToken, auth);
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): LoginModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
