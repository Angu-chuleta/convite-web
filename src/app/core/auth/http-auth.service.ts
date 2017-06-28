import { ConnectionBackend, Request, RequestOptions } from '@angular/http'
import { HttpAuthInterceptor } from './http-auth-interceptor.service'
import { InterceptorConfig } from './interceptor.config'
import { TokenStorageService } from './token-storage.service'

export class HttpAuthService extends HttpAuthInterceptor {

  /**
   * Creates an instance of HttpAuthService.
   * @param {ConnectionBackend} backend
   * @param {RequestOptions} defaultOptions
   * @param {TokenStorageService} tokenStorage
   * @memberof HttpAuthService
   */
  constructor (
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private tokenStorage: TokenStorageService ) {
    super( backend, defaultOptions, new InterceptorConfig( { noTokenError: true } ) )
  }

  /**
   *
   *
   * @override
   * @protected
   * @returns {string}
   * @memberof HttpAuthService
   */
  protected getToken (): string {
    return this.tokenStorage.get()
  }

  /**
   *
   *
   * @override
   * @protected
   * @memberof HttpAuthService
   */
  protected removeToken () {
    this.tokenStorage.remove()
  }

  /**
   *
   *
   * @override
   * @protected
   * @param {Request} req
   * @returns {boolean}
   * @memberof HttpAuthService
   */
  protected shouldIntercept ( req: Request ): boolean {
    const intercept = !req.headers.has( 'noIntercept' )
    if ( !intercept ) {
      req.headers.delete( 'noIntercept' )
    }

    return intercept
  }
}
