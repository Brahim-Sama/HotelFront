import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from './classes/admin';
// ng g g auth

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('appel de canActivate');

    if (sessionStorage.getItem('connected')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  isConnected(): boolean {
    return sessionStorage.getItem('connected') != null;
  }

  getUserFullname(): string | undefined {
    let admin: Admin;
    let ss = sessionStorage.getItem('admin');
    if (ss != null) {
      admin = JSON.parse(ss);

      return admin.username;
    } else {
      return '';
    }
  }

  getUser(): Admin {
    let admin: Admin;
    let ss = sessionStorage.getItem('admin');
    if (ss != null) {
      admin = JSON.parse(ss);
      return admin;
    } else {
      console.log('je retourne null');
      return new Admin();
    }
  }
}
