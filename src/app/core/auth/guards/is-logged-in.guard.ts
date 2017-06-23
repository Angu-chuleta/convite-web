import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AuthService } from './../auth.service'

@Injectable()
export class IsLoggedInGuard implements CanLoad, CanActivate {

  constructor (
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Impede ou permite o carregamento da rota que declarar este guard
   *
   * @param {Route} route
   * @returns {(boolean | Observable<boolean> | Promise<boolean>)}
   *
   * @memberof IsLoggedInGuard
   */
  canLoad (route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.resolve(route && route.path ? route.path.split('/').filter(u => u.length) : [])
  }

  /**
   * Impede ou permite que ative a rota que declarar este guard
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(boolean | Observable<boolean> | Promise<boolean>)}
   *
   * @memberof IsLoggedInGuard
   */
  canActivate (route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.resolve(route.url.map(seg => seg.path))
  }

  /**
   * Resolve a lógica de permitir ou negar acesso a rota
   *
   * @private
   * @param {Array<string>} [redirect]
   * @returns {boolean}
   *
   * @memberof IsLoggedInGuard
   */
  private resolve (redirect?: Array<string>): boolean {
    let isAuth = this.auth.isAuthenticated

    if (redirect) {
      this.auth.redirect = redirect
    }

    if (!isAuth) {
      this.router.navigate(['/auth', 'login'])
    }

    return isAuth
  }

}
