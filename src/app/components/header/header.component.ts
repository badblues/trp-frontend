import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userFullName: string = '';
  userRole: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
    this.userDataService
      .onFullNameChange()
      .subscribe((fullName) => (this.userFullName = fullName));
    this.userDataService
      .onRoleChange()
      .subscribe((role) => (this.userRole = role));
  }

  ngOnInit() {
    //TODO handle this
    let data = localStorage.getItem('user');
    if (data == null) return;
    let userInfo = JSON.parse(data);
    this.userRole = userInfo['role'];
  }

  //TODO DRY
  navigateToMainPage() {
    this.router.navigate(['']);
  }
  navigateToCreateUserPage() {
    this.router.navigate(['create/user']);
  }

  logout() {
    this.authService.logout();
  }
}
