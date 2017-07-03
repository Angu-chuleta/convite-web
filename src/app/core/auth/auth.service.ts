import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { IPreSignUp, ISignUp, IUserClaims } from 'interfaces'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GRC_CONFIG } from '../app.config'
import { BaseService } from '../providers/base.service'
import { Token } from './jwt-helper'
import { JwtHelper } from './jwt-helper'
import { TokenStorageService } from './token-storage.service'

@Injectable()
export class AuthService extends BaseService {

  public redirect: string[] = ['/dashboard']
  private user: IUserClaims | null
  private token: string

  /**
   * Creates an instance of AuthService.
   * @param {Http} http
   * @param {TokenStorageService} tokenStorage
   * @param {JwtHelper} jwt
   *
   * @memberof AuthService
   */
  constructor (
    private http: Http,
    private tokenStorage: TokenStorageService,
    private jwt: JwtHelper) {
    super()
    this.tokenStorage.token$
      .subscribe(
      token => {
        this.user = token ? this.jwt.decodeToken(token) : null
        this.token = token
      },
      err => this.handleError(err)
      )
  }

  /**
   * Is authenticated
   * Retorna se o usuário atual está atutenticado
   *
   * @readonly
   * @type {boolean}
   * @memberof AuthService
   */
  public get isAuthenticated (): boolean {
    return !!this.token && !this.jwt.isTokenExpired(this.token)
  }

  /**
   * GET Atual user
   *
   * @readonly
   * @type {IUserClaims}
   * @memberof AuthService
   */
  public get atualUser (): IUserClaims | null {
    return this.user
  }

  /**
   * Login
   *
   * @param {{ email: string, password: string, keepLogin?: boolean }} credentials
   * @returns {Observable<IUserClaims>}
   *
   * @memberof AuthService
   */
  public login (credentials: { email: string, password: string, keepLogin?: boolean }): Observable<IUserClaims> {
    const keepLogin = !!credentials.keepLogin
    delete credentials.keepLogin
    return this.http.post(`${GRC_CONFIG.apiEndPoint}/login`, credentials)
      .catch(this.handleError)
      .map(this.extractData)
      .map((token: Token) => {
        this.tokenStorage.set(token, keepLogin)
        this.user = this.jwt.decodeToken(token)
        return this.user
      })
  }

  /**
   * Pre sign up
   *
   * @param {IPreSignUp} preSignupModel
   * @returns {Observable<void>}
   *
   * @memberof AuthService
   */
  public preSignUp (preSignupModel: IPreSignUp): Observable<void> {
    return this.http.post(`${GRC_CONFIG.apiEndPoint}/signup`, preSignupModel)
      .map(this.extractData)
      .map(() => void (0))
      .catch(this.handleError)
  }

  /**
   * Sign up
   *
   * @param {string} token
   * @param {ISignUp} signUpModel
   * @returns {Observable<void>}
   *
   * @memberof AuthService
   */
  public signUp (token: string, signUpModel: ISignUp): Observable<void> {
    return new Observable<void>(sub => {
      this.http.put(`${GRC_CONFIG.apiEndPoint}/signup/${token}`, signUpModel)
        .map(this.extractData)
        .subscribe(() => {
          this.login({ email: signUpModel.email, password: signUpModel.password })
            .finally(() => { sub.next(void (0)); sub.complete() })
            .subscribe(
            () => void (0)
            )
        })
    })
  }

  /**
   * Get email by token
   *
   * @param {string} token
   * @returns {Observable<IPreSignUp>}
   *
   * @memberof AuthService
   */
  public getEmailByToken (token: string): Observable<IPreSignUp> {
    return this.http.get(`${GRC_CONFIG.apiEndPoint}/signup/${token}`)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public logout (): void {
    this.tokenStorage.remove()
  }

}
