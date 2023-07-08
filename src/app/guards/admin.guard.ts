import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  userRole: string = '';

  constructor(private router: Router) {}

  //TODO: bad, bad, everything is bad...

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let data = localStorage.getItem('user');
    if (data != null) {
      let userInfo = JSON.parse(data);
      this.userRole = userInfo['role'];
    }
    if (this.userRole == 'ROLE_ADMIN') {
      return true;
    } else {
      return this.router.navigate(['']);
    }
  }
}
