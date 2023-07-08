import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css'],
})
export class CreateUserPageComponent {
  username: string = '';
  fullName: string = '';
  password: string = '';

  createdUserData: any

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (
      this.username.length == 0 ||
      this.fullName.length == 0 ||
      this.password.length == 0
    ) {
      alert('Некоторые поля не заполнены');
      return;
    }
    let user: User = {
      username: this.username,
      fullName: this.fullName,
      password: this.password,
    };
    this.createUser(user);
  }

  createUser(user: User) {
    this.authService
      .register(user)
      .subscribe((response) => console.log(response));
  }
}
