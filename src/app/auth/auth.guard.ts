import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userService: UserService;
  constructor(private router: Router, userService: UserService) {
    this.userService = userService
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.userService.isLoggedIn
    if(!isLoggedIn){
      this.router.navigate(['login']);
    }
    return isLoggedIn;
  }

}
