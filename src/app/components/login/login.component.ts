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
  response: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    var user = {
      login: this.login,
      password: this.password
    };
    this.userService.login(user).subscribe((response) => response = this.response);
    console.log(this.response);
    if (this.response.status == "Succesfull")
      this.router.navigate([""]);
  }

}
