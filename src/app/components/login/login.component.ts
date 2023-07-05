import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  response: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem("userToken")) {
      this.router.navigate([""]);
      return;
    }
  }

  onSubmit() {
    var user: User = {
      username: this.username,
      password: this.password
    };
    this.login(user);
  }

  login(user: User) {
    this.authService.login(user);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

}
