import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AuthService } from '../auth.service'

@Injectable()
export class AuthRouterGuard implements CanLoad, CanActivate {

  constructor (
    private auth: AuthService,
    private router: Router) {}

  canActivate (): boolean | Observable<boolean> | Promise<boolean> {
    return this.guard()
  }

  canLoad (): boolean | Observable<boolean> | Promise<boolean> {
    return this.guard()
  }

  private guard (): boolean {
    const isAuth = this.auth.isAuthenticated
    if (isAuth) {
      this.router.navigate(this.auth.redirect)
    }
    return !isAuth
  }

}
