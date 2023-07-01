import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://212.20.47.147:8080/api/';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    let url: string = this.apiUrl + `login?username=${user.login}&password=${user.password}`;
    return this.http.get<any>(url);
  }
  
}
