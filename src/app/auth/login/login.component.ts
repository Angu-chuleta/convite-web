import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/core/auth'
import { ICredentialsLogin } from 'interfaces'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: ICredentialsLogin
  loading: boolean = false
  message: string

  /**
   * Creates an instance of LoginComponent.
   * @param {Router} router
   * @param {AuthService} auth
   *
   * @memberof LoginComponent
   */
  constructor (
    private router: Router,
    private auth: AuthService) { }

  /**
   * On submit form
   *  form is valid
   *
   * @param {ICredentialsLogin} credentials
   *
   * @memberof LoginComponent
   */
  onSubmit (credentials: ICredentialsLogin) {
    this.loading = true
    this.credentials = Object.assign({}, credentials)
    this.auth.login(credentials)
      .subscribe(
      () => {
        this.router.navigate(this.auth.redirect)
      },
      () => {
        this.message = 'Usuário ou senha inválido!'
        this.loading = false
      }
      )
  }
}
