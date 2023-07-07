import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/AuthData';
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
    var data: AuthData = {
      username: this.username,
      password: this.password
    };
    this.login(data);
  }

  login(data: AuthData) {
    this.authService.login(data);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
