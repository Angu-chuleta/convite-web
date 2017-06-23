import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'app/core/auth'
import { IPreSignUp, ISignUp } from 'interfaces'
import { Subscription } from 'rxjs/Subscription'

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {

  email: string
  token: string
  alert = {
    message: '',
    color: ''
  }
  loading = false

  private subscriptions: Subscription[] = []

  /**
   * Creates an instance of SignUpComponent.
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {AuthService} auth
   *
   * @memberof SignUpComponent
   */
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      const token = params['token']
      if (!token) { return }
      this.loading = true
      this.token = token
      this.subscriptions.push(this.auth.getEmailByToken(token)
        .subscribe(
        preSignUp => { this.email = preSignUp.email },
        err => {
          this.alert = {
            message: err,
            color: 'danger'
          }
          this.token = ''
          this.router.navigate(['./'], { queryParams: {}, relativeTo: this.route })
        }
        ))
    }))
  }

  /**
   * Pre sign up submit form
   *
   * @param {IPreSignUp} preSignupModel
   *
   * @memberof SignUpComponent
   */
  preSignUp (preSignupModel: IPreSignUp): void {
    this.loading = true
    this.subscriptions.push(this.auth.preSignUp(preSignupModel)
      .finally(() => { this.loading = false })
      .subscribe(
      () => {
        this.alert = {
          message: 'Email de cadastro enviado com sucesso! Por favor verifique sua caixa de entrada ou lixo eletrônico (spam) e siga as instruções para o segundo passo.',
          color: 'success'
        }
      },
      err => {
        this.alert = {
          message: err,
          color: 'danger'
        }
      }
      ))
  }

  /**
   * Sign up submit form
   *
   * @param {ISignUp} signUpModel
   *
   * @memberof SignUpComponent
   */
  signUp (signUpModel: ISignUp): void {
    this.loading = true
    this.subscriptions.push(this.auth.signUp(this.token, signUpModel)
      .finally(() => { this.loading = false })
      .subscribe(
      () => {
        this.alert = {
          message: 'Cadastro realizado com sucesso!',
          color: 'success'
        }
        this.router.navigate(this.auth.redirect)
      },
      err => {
        this.alert = {
          message: err,
          color: 'danger'
        }
      }
      ))
  }

  /**
   * On destroy component
   *
   *
   * @memberof SignUpComponent
   */
  ngOnDestroy (): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
