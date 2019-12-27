import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getMetrics(): Observable<any> {
      return this.http.get('/db/po')
                .pipe( res => {
                    return res;
                })
  }
}
