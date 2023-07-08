import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  username: string = '';
  fullName: string = '';
  role: string = '';
  usernameSubject = new BehaviorSubject<string>(this.username);
  fullNameSubject = new BehaviorSubject<string>(this.fullName);
  roleSubject = new BehaviorSubject<string>(this.role);

  constructor() {
    this.reloadData();
  }

  public reloadData() {
    this.loadData();
    this.usernameSubject.next(this.username);
    this.fullNameSubject.next(this.fullName);
    this.roleSubject.next(this.role);
  }

  public onUsernameChange(): Observable<string> {
    return this.usernameSubject.asObservable();
  }
  
  public onFullNameChange(): Observable<string> {
    return this.fullNameSubject.asObservable();
  }

  public onRoleChange(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  private loadData() {
    const data = localStorage.getItem('user');
    if (data == null) {
      this.username = "";
      this.fullName = "";
      this.role = "";
      return;
    }
    const userInfo = JSON.parse(data);
    this.username = userInfo['username'];
    this.fullName = userInfo['fullName'];
    this.role = userInfo['role'];
  }
}
