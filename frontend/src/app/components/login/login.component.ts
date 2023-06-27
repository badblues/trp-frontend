import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: string = "";
  password: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    var user = {
      login: this.login,
      password: this.password
    };
    if (this.userService.login(user))
      this.router.navigate(["/main"]);
  }

}
