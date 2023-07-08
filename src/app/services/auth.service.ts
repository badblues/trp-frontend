import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TestabilityRegistry } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Observable, catchError } from 'rxjs';
import { AuthData } from '../models/AuthData';
import jwtDecode from 'jwt-decode';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://212.20.47.147:8080/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  public register(user: User): Observable<User> {
    console.log(this.apiUrl + 'registration');
    return this.http.post<User>(
      this.apiUrl + 'registration',
      user,
      this.httpOptions
    );
  }

  public login(data: AuthData) {
    this.http
      .post(this.apiUrl + 'auth/login', data, this.httpOptions)
      .subscribe({
        next: (response: any) => {
          //TODO possibly unnecessary check
          if (response['status'] == 200) {
            localStorage.setItem('userToken', response['jwtToken']);
            this.decodeToken(response['jwtToken']);
            this.router.navigate(['']);
            this.userDataService.reloadData();
          }
        },
        error: (httpErrorResponse) => {
          alert(httpErrorResponse.error['authenticationError']);
        },
      });
  }

  public logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.userDataService.reloadData();
  }

  private decodeToken(token: string) {
    try {
      let decodedToken: any = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
    } catch (error) {
      console.error(error);
    }
  }
}
