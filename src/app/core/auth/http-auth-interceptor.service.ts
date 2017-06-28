import { ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/Observable'
import { InterceptorConfig } from './interceptor.config'

/**
 *
 *
 * @export
 * @abstract
 * @class HttpAuthInterceptor
 * @extends {Http}
 */
export abstract class HttpAuthInterceptor extends Http {

  private origRequest: Request

  /**
   * Creates an instance of HttpAuthInterceptor.
   * @param {ConnectionBackend} backend
   * @param {RequestOptions} defaultOptions
   * @param {InterceptorConfig} inteceptorConfig
   * @memberof HttpAuthInterceptor
   */
  constructor ( backend: ConnectionBackend, defaultOptions: RequestOptions, private inteceptorConfig: InterceptorConfig ) {
    super( backend, defaultOptions )
  }

  /**
   *
   *
   * @param {(string | Request)} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  request ( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
    if ( typeof url === 'string' ) {
      return this.get( url, options )
    }

    const req = url as Request

    if ( !this.shouldIntercept( req ) ) {
      return super.request( req )
    }
    return this.intercept( this.requestWithToken( req, this.getToken() ) )
  }

  /**
   *
   *
   * @param {string} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  get ( url: string, options?: RequestOptionsArgs ): Observable<Response> {
    return super.get( url, this.getRequestOptionArgs( options ) )
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  post ( url: string, body: any, options?: RequestOptionsArgs ): Observable<Response> {
    return super.post( url, body, this.getRequestOptionArgs( options ) )
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  put ( url: string, body: any, options?: RequestOptionsArgs ): Observable<Response> {
    return super.put( url, body, this.getRequestOptionArgs( options ) )
  }

  /**
   *
   *
   * @param {string} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  delete ( url: string, options?: RequestOptionsArgs ): Observable<Response> {
    return super.delete( url, this.getRequestOptionArgs( options ) )
  }

  protected abstract shouldIntercept ( req: Request ): boolean
  protected abstract removeToken (): void
  protected abstract getToken (): string

  /**
   *
   *
   * @protected
   * @param {Request} req
   * @param {string} token
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  protected requestWithToken ( req: Request, token: string ): Observable<Response> {
    this.origRequest = req
    if ( !this.inteceptorConfig.noTokenError && !token ) {
      return Observable.throw( new Error( 'No authorization token given' ) )
    } else {
      req.headers.set( this.inteceptorConfig.headerName, `${token}` )
    }

    return super.request( req )
  }

  /**
   *
   *
   * @protected
   * @param {Observable<Response>} observable
   * @returns {Observable<Response>}
   * @memberof HttpAuthInterceptor
   */
  protected intercept ( observable: Observable<Response> ): Observable<Response> {
    return observable.catch(( resp: Response, source: any ) => {

      let body = resp.json()

      if ( resp.status === 401 && body.error === 'token_expired' ) {
        this.removeToken()
        return Observable.throw( { message: 'Sessão expirada!' } )
      }

      if ( resp.status === 401 && body.error === 'token_invalid' ) {
        this.removeToken()
        return Observable.throw( { message: 'Não autorizado! Por favor faça o login.' } )
      }

      return Observable.throw( resp )
    } )
  }

  /**
   *
   *
   * @private
   * @param {RequestOptionsArgs} [options]
   * @returns {RequestOptionsArgs}
   * @memberof HttpAuthInterceptor
   */
  private getRequestOptionArgs ( options?: RequestOptionsArgs ): RequestOptionsArgs {
    if ( options == null ) {
      options = new RequestOptions()
    }
    if ( options.headers == null ) {
      options.headers = new Headers()
    }
    options.headers.append( 'Content-Type', 'application/json' )
    return options
  }

}
