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
  data: IDriveModel;
}

export interface IDriveModel {
  avatar?: null | string;
  created_at?: string;
  email: string;
  email_verified_at?: string;
  id: number;
  last_login_at?: null | string;
  last_login_ip?: null | string;
  name?: string;
  profile_photo_path?: null | string;
  updated_at?: string;
  password?: string;
  status?: number;
  phone_no?: string;
  customer_id: number;
  customer?: null | ICustomerModel;
  note?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getDrivers(dataTablesParameters: any): Observable<DataTablesResponse> {
    const url = `${environment.apiUrl}/admin/v1/drivers/drivers_dataTable`;
    return this.http.post<DataTablesResponse>(url, dataTablesParameters);
  }

  editDriver(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/drivers/edit/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  updateDriver(id: number, customer: IDriveModel): Observable<IDriveModel> {
    const url = `${environment.apiUrl}/admin/v1/drivers/update/${id}`;
    return this.http.put<IDriveModel>(url, customer);
  }

  createDriver(customer: IDriveModel): Observable<IDriveModel> {
    const url = `${environment.apiUrl}/admin/v1/drivers/store`;
    return this.http.post<IDriveModel>(url, customer);
  }

  deleteDriver(id: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/v1/drivers/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
