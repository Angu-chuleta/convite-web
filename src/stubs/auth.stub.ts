import { ICredentialsLogin, IPreSignUp, ISignUp, IUserClaims } from 'interfaces'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/finally'
import { Observable } from 'rxjs/Observable'

export class AuthStub {

  redirect: string[] = ['/dashboard']
  isAuthenticated = false

  login (credentials?: ICredentialsLogin): Observable<any> {
    if (!credentials) {
      return Observable.throw(new Error('401'))
    }
    this.isAuthenticated = true
    const user: IUserClaims = {
      id: Math.random().toString(),
      active: true,
      createdAt: new Date(),
      email: credentials.email,
      isAdmin: false,
      name: 'test',
      exp: 1231231,
      iat: 121213,
      updatedAt: new Date()
    }
    return Observable.of(user)
  }

  getEmailByToken (token?: string): Observable<IPreSignUp> {
    if (!token || token === 'test-error-token') {
      return new Observable(sub => {
        sub.error(new Error())
        sub.complete()
      })
    }
    return Observable.of({
      email: 'test@test.com'
    })
  }

  preSignUp (preSignupModel: IPreSignUp): Observable<void> {
    if (!preSignupModel) {
      return Observable.throw('Test error')
    }
    return Observable.of(void (0))
  }

  signUp (token: string, signUpModel: ISignUp): Observable<void> {
    if (!signUpModel || !token) {
      return Observable.throw('Test error')
    }
    return Observable.of(void (0))
  }

}

export const AUTH_STUB = new AuthStub()
