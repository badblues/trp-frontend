import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username!: string;
  password!: string;
  fullName!: string;
  confirmationPassword!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.router.navigate(['']);
      return;
    }
  }

  onSubmit() {
    if (
      this.password.length == 0 ||
      this.username.length == 0 ||
      this.fullName.length == 0
    ) {
      alert("Заполните все поля");
      return;
    }
    var newUser: User = {
      username: this.username,
      password: this.password,
      fullName: this.fullName,
    };
    this.register(newUser);
  }

  register(user: User) {
    console.log('register method');
    this.authService.register(user).subscribe();
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
