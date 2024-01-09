import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CountryModel } from '../country/country.service';

export interface DataTablesResponse {
  draw?: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: ICustomerModel;
}
export interface ICustomerModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  country_id: number;
  city?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  country?:CountryModel;
}
// export interface ICustomerModel {
//   avatar?: null | string;
//   created_at?: string;
//   email: string;
//   email_verified_at?: string;
//   id: number;
//   last_login_at?: null | string;
//   last_login_ip?: null | string;
//   name?: string;
//   profile_photo_path?: null | string;
//   updated_at?: string;
//   password?: string;
//   status?: number;
//   phone?: string;
//   country_id?: any;
//   city?: string;
// }

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(dataTablesParameters: any): Observable<DataTablesResponse> {
    const url = `${environment.apiUrl}/admin/v1/customers/customers_dataTable`;
    return this.http.post<DataTablesResponse>(url, dataTablesParameters);
  }

  getCustomer(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/customers/show/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  editCustomer(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/customers/edit/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  updateCustomer(id: number, customer: ICustomerModel): Observable<ICustomerModel> {
    const url = `${environment.apiUrl}/admin/v1/customers/update/${id}`;
    return this.http.put<ICustomerModel>(url, customer);
  }

  createCustomer(customer: ICustomerModel): Observable<ICustomerModel> {
    const url = `${environment.apiUrl}/admin/v1/customers/store`;
    return this.http.post<ICustomerModel>(url, customer);
  }

  deleteCustomer(id: number): Observable<void> {
      const url = `${environment.apiUrl}/admin/v1/customers/delete/${id}`;
      return this.http.delete<void>(url);
  }
}
