import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface DataTablesResponse {
  draw?: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: IVehicleModel;
}

export interface IVehicleModel {
  name?: string;
  note?: string;
  status?: number;
  created_at?: string;
  id: number;
  updated_at?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private apiUrl = `${environment.apiUrl}/api/v1/vehicles`;

  constructor(private http: HttpClient) {}

  getVehicles(dataTablesParameters: any): Observable<DataTablesResponse> {
    const url = `${environment.apiUrl}/admin/v1/vehicles/`;
    return this.http.post<DataTablesResponse>(url, dataTablesParameters);
  }
}
