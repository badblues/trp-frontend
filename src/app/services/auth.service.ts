import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl: string = 'http://212.20.47.147:8080/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<User> {
    console.log(this.apiUrl + '/registration');
    return this.http.post<User>(
      this.apiUrl + '/registration',
      user,
      this.httpOptions
    );
  }

  login(user: User) {
    this.http
      .post(this.apiUrl + '/login', user, this.httpOptions)
      .subscribe((response: any) => {
        if (!response['message']) {
          localStorage.setItem('userToken', response['jwt-token'].toString());
          this.router.navigate(['']);
        } else {
          alert('Wrond email or password');
        }
      });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
