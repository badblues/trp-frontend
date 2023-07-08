import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public username: string = "";
  public userFullName: string = "";
  public userRole: string = "";

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {
    this.userDataService
      .onUsernameChange()
      .subscribe((username) => (this.username = username));
    this.userDataService
      .onFullNameChange()
      .subscribe((fullName) => (this.userFullName = fullName));
    this.userDataService
      .onRoleChange()
      .subscribe((role) => (this.userRole = role));
  }

  ngOnInit() {
    if (!localStorage.getItem('userToken')) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
