import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResponse {
  status: boolean;
  message: string;
  data: CountryModel;
}
export interface CountryModel {
  id: number;
  name: string;
  short_code?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

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
