import { Injectable } from '@angular/core'
import { ConnectionBackend, Http, RequestOptions } from '@angular/http'

@Injectable()
export class HttpInterceptorService extends Http {

  constructor (backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions)
  }

}
