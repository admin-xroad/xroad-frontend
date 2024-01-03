import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoleModel } from '../role/role.service';
import { environment } from 'src/environments/environment';

export interface DataTablesResponse {
    draw?: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: any[];
}

export interface ApiResponse {
    status: boolean;
    message: string;
    data: IUserModel;
}

export interface IUserModel {
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
    roles?: IRoleModel[];
    role?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = 'https://preview.keenthemes.com/starterkit/metronic/laravel/api/v1/users';
    // private apiUrl = 'http://127.0.0.1:8000/api/v1/users';

    constructor(private http: HttpClient) { }

    // getUsers(dataTablesParameters: any): Observable<DataTablesResponse> {
    //     const url = `${this.apiUrl}-list`;
    //     return this.http.post<DataTablesResponse>(url, dataTablesParameters);
    // }
    
    getUsers(dataTablesParameters: any): Observable<DataTablesResponse> {
        const url = `${environment.apiUrl}/admin/v1/users/users_dataTable`;
        return this.http.post<DataTablesResponse>(url, dataTablesParameters);
    }

    // getUser(id: number): Observable<IUserModel> {
    //     const url = `${this.apiUrl}/${id}`;
    //     return this.http.get<IUserModel>(url);
    // }

    edit(id: number): Observable<ApiResponse> {
        const url = `${environment.apiUrl}/admin/v1/users/edit/${id}`;
        return this.http.get<ApiResponse>(url);
    }

    createUser(user: IUserModel): Observable<IUserModel> {
        const url = `${environment.apiUrl}/admin/v1/users/store`;
        return this.http.post<IUserModel>(url, user);
    }

    updateUser(id: number, user: IUserModel): Observable<IUserModel> {
        const url = `${environment.apiUrl}/admin/v1/users/update/${id}`;
        return this.http.put<IUserModel>(url, user);
    }

    deleteUser(id: number): Observable<void> {
        const url = `${environment.apiUrl}/admin/v1/users/delete/${id}`;
        return this.http.delete<void>(url);
    }
}