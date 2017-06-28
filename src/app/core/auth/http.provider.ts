import { ConnectionBackend, Http, RequestOptions, XHRBackend } from '@angular/http'
import { HttpAuthService } from './http-auth.service'
import { TokenStorageService } from './token-storage.service'

/**
 *
 *
 * @export
 * @param {ConnectionBackend} backend
 * @param {RequestOptions} defaultOptions
 * @param {Storage} storage
 * @returns
 */
export function getHttpAuth ( backend: ConnectionBackend, defaultOptions: RequestOptions, tokenStorage: TokenStorageService ) {
  return new HttpAuthService( backend, defaultOptions, tokenStorage )
}

export const httpProvider = {
  provide: Http,
  useFactory: getHttpAuth,
  deps: [ XHRBackend, RequestOptions, TokenStorageService ]
}
