import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate, CanActivateChild {
  constructor(private router: Router, private http: HttpClient) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedData = JSON.parse(atob(token.split('.')[1]));
      if (decodedData.isAdmin && !this._tokenExpired(decodedData.exp)) {
        console.log('is Admin truue');
        return true;
      } else {
        // console.log('from auth guard', decodedData);
        this.router.navigate(['login']);
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}
