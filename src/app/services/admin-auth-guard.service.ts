import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  
  canActivate() {
    return this.auth.appUser$.pipe(map((appUser: { isAdmin: any; }) => appUser.isAdmin))
  }
}
