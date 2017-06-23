import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/core/auth'

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  /**
   * Creates an instance of AuthComponent.
   * @param {AuthService} auth
   * @param {Router} router
   *
   * @memberof AuthComponent
   */
  constructor (
    private auth: AuthService,
    private router: Router) {
    if (this.auth.isAuthenticated) {
      this.router.navigate(this.auth.redirect)
    }
  }

}
