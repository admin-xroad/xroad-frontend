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
  data: IDriverModel;
}


export interface IDriverModel {
  id: number;
  customer_id: number;
  customer?: ICustomerModel;
  name: string;
  email: string;
  email_verified_at?: string | null;
  password?: string;
  phone_no: string;
  status?: string;
  note?: string | null;
  model?: string | null;
  plate?: string | null;
  city?: string | null;
  country?: number | null;
  profile_image?: string | null;
  vehicle_id?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
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

  getDriver(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/drivers/show/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  editDriver(id: number): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/admin/v1/drivers/edit/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  updateDriver(id: number, customer: IDriverModel): Observable<IDriverModel> {
    const url = `${environment.apiUrl}/admin/v1/drivers/update/${id}`;
    return this.http.put<IDriverModel>(url, customer);
  }

  createDriver(customer: IDriverModel): Observable<IDriverModel> {
    const url = `${environment.apiUrl}/admin/v1/drivers/store`;
    return this.http.post<IDriverModel>(url, customer);
  }

  deleteDriver(id: number): Observable<void> {
    const url = `${environment.apiUrl}/admin/v1/drivers/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
