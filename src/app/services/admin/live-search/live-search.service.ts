import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ILiveSearchModel {
  value: any,
  label: any
}

@Injectable({
  providedIn: 'root'
})
export class LiveSearchService {

  constructor(private http: HttpClient) { }

  searchLive(query: string, tableName: string, selectKey: string, selectValue: string, searchColumns: string): Observable<any> {
    const url = `${environment.apiUrl}/admin/v1/live_search/${tableName}/${selectKey}/${selectValue}/${searchColumns}`;
    return this.http.get<ILiveSearchModel>(url, { params: { q: query } });
  }

  searchLiveRelational(query: string, tableName: string, selectKey: string, selectValue: string, searchColumns: string, matchColumn: string, matchId: string, matchColumnTwo?: string, matchIdTwo?: string): Observable<any> {
    const url = `${environment.apiUrl}/admin/v1/live_search_relational/${tableName}/${selectKey}/${selectValue}/${searchColumns}/${matchColumn}/${matchId}`;

    // Create an object to hold the parameters
    const params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] } = {
      q: query,
    };

    // Add optional parameters if provided
    if (matchColumnTwo !== undefined) {
      params.matchColumnTwo = matchColumnTwo;
    }

    if (matchIdTwo !== undefined) {
      params.matchIdTwo = matchIdTwo;
    }

    return this.http.get<ILiveSearchModel>(url, { params });
  }
}
