import { Response } from '@angular/http'
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable'

export class BaseService {

  /**
   * Obter dados
   *
   * @protected
   * @param {Response} res
   * @returns {*}
   *
   * @memberof BaseService
   */
  protected extractData (res: Response): any {
    let body: any
    try {
      body = res.json()
    } catch (err) {
      try {
        body = res.text()
      } catch (err) {
        body = null
      }
    }
    return body
  }

  /**
   * Manipulação de erro
   *
   * @protected
   * @param {(Response | any)} error
   * @returns
   *
   * @memberof BaseService
   */
  protected handleError (error: Response | any) {
    let message: string = 'Ocorreu um erro inesperado!'
    let body: any
    try {
      body = error.json() || null
    } catch (err) {
      try {
        body = error.text() || null
      } catch (e) {
        body = null
      }
    }

    if (typeof body === 'string') {
      message = body
    } else if (body && body.message) {
      message = body.message
    } else if (body && body.error && body.error.message) {
      message = body.error.message
    }

    return Observable.throw(message)
  }
}
