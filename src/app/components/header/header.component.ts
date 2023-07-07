import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToMainPage() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }
}
