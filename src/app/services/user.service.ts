import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://212.20.47.147:8080/api/';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User) {
    let url: string = this.apiUrl + `login?username=${user.login}&password=${user.password}`;
    return this.http.get<any>(url).subscribe((response) => {
      console.log(response);
      if (response.status == "Succesfull")
        this.router.navigate([""]);;
    });
  }
}
