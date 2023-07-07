import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  response: any;

  emptyUsername: boolean = false;
  emptyPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.router.navigate(['']);
      return;
    }
  }

  onSubmit() {
    this.emptyUsername = this.username == '' ? true : false;
    this.emptyPassword = this.password == '' ? true : false;
    if (this.emptyUsername || this.emptyPassword) return;
    var user: User = {
      username: this.username,
      password: this.password,
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
