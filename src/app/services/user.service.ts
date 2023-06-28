import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  login(user: User): boolean {
    let url: string = this.apiUrl + `login?username=${user.login}&password=${user.password}`;
    let status: string = "boba";
    this.http.get<any>(url).subscribe((response) => {
      status = response.status;
    });
    if (status == 'Succesfull')
      return true;
    return false;
  }

}
