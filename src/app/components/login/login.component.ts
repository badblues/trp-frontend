import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: string = "";
  password: string = "";
  response: any;

  constructor(
    private userService: UserService,
  ) {}

  onSubmit() {
    var user = {
      login: this.login,
      password: this.password
    };
    this.userService.login(user);
  }

}
