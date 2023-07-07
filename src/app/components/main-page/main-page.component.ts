import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router) {}

  onClick() {
    console.log('huy');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    if (!localStorage.getItem('userToken')) {
      this.router.navigate(['/login']);
      return;
    }
  }

  getInfo(): string {
    let data = localStorage.getItem('user');
    if (data == null) return '';
    let userInfo = JSON.parse(data);
    return (
      userInfo['username'] + " " +
      userInfo['fullName'] + " " +
      userInfo['role']
    );
  }
}
