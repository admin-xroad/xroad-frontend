import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICustomerModel } from '../customer/customer.service';

export interface DataTablesResponse {
  draw?: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: ICustomerContactModel;
}

// export interface ICustomerContactModel {
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
//   customer_id: number;
//   customer?: null | ICustomerModel;
// }
export interface ICustomerContactModel {
  id: number;
  customer_id: number;
  customer?: null | ICustomerModel;
  name: string;
  email: string;
  password?: string;
  phone: string;
  profile_image?: string | null;
  status?: number;
  is_owner?: number;
  tnc_flag?: number;
  email_verified_at?: string | null;
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerContactService {

  constructor(private http: HttpClient) { }

  getCustomerContacts(dataTablesParameters: any): Observable<DataTablesResponse> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/contacts_dataTable`;
    return this.http.post<DataTablesResponse>(url, dataTablesParameters);
  }

  getContact(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/show/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  editContact(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/edit/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  updateContact(id: number, customer: ICustomerContactModel): Observable<ICustomerContactModel> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/update/${id}`;
    return this.http.put<ICustomerContactModel>(url, customer);
  }

  createContact(customer: ICustomerContactModel): Observable<ICustomerContactModel> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/store`;
    return this.http.post<ICustomerContactModel>(url, customer);
  }

  deleteContact(id: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/v1/customer-contacts/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
