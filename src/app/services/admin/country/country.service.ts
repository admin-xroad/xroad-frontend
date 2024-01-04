import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountriesList() {
    const url = `${environment.apiUrl}/admin/v1/countries/list`;
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        console.log("getting error on api : ", of(err));
        throw err;
      })
    );
  }
}
