import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { GRC_CONFIG } from 'app/core'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import { Observable } from 'rxjs/Observable'
import { BaseService } from '../base.service'

type Params = { [key: string]: number | string }

@Injectable()
export abstract class ApiBaseService<T extends { id: string }> extends BaseService {

  protected apiEndPoint: string = GRC_CONFIG.apiEndPoint
  protected resource: string
  private http: Http

  /**
   * Creates an instance of ApiBaseService.
   * @param {Http} http
   *
   * @memberof ApiBaseService
   */
  constructor (http: Http) {
    super()
    this.http = http
  }

  /**
   * Set resource name
   * Diz a parte da rota do servidor que está
   * contido as requisições do modelo atual
   *
   * @param {string} resource
   *
   * @memberof ApiBaseService
   */
  public setResource (resource: string) {
    this.resource = resource
    this.apiEndPoint = `${this.apiEndPoint}/${this.resource}`
  }

  /**
   * Get from id
   * Dado um id de um registro do modelo atual,
   * busca no servidor e retorna o registro completo
   *
   * @param {string} id
   * @returns {Observable<T>}
   *
   * @memberof ApiBaseService
   */
  public get (id: string): Observable<T> {
    return this.normalizeObservable(
      this.http.get(this.normalizeURI(id))
    )
  }

  /**
   * Get all
   * Obtém todos os registros, no servidor, do modelo atual {T}
   *
   * @returns {Observable<T[]>}
   *
   * @memberof ApiBaseService
   */
  public getAll (): Observable<T[]> {
    return this.normalizeObservable(
      this.http.get(this.normalizeURI('/'))
    )
  }

  /**
   * Save model
   * Salva no servidor o registro atual
   *
   * @param {T} model Registro atual
   * @returns {Observable<T>}
   *
   * @memberof ApiBaseService
   */
  public save (model: T): Observable<T> {
    if (model.id) {
      return this.update(model)
    }
    return this.create(model)
  }

  /**
   * Delete
   * Apaga o registro atual no servidor
   *
   * @param {T} model Registro atual
   * @returns {Observable<T>}
   *
   * @memberof ApiBaseService
   */
  public delete (model: T): Observable<T> {
    return this.normalizeObservable(
      this.http.delete(this.normalizeURI(model.id))
    )
  }

  /**
   * Create
   * Cria o registro atual no servidor
   *
   * @protected
   * @param {T} model Registro atual
   * @returns {Observable<T>}
   *
   * @memberof ApiBaseService
   */
  protected create (model: T): Observable<T> {
    return this.normalizeObservable(
      this.http.post(this.apiEndPoint, model)
    )
  }

  /**
   * Update
   * Atualiza o registro atual no servidor
   *
   * @protected
   * @param {T} model Registro atual
   * @returns {Observable<T>}
   *
   * @memberof ApiBaseService
   */
  protected update (model: T): Observable<T> {
    return this.normalizeObservable(
      this.http.post(this.apiEndPoint, model)
    )
  }

  /**
   * Normalize URI
   * dado uma rota e seus parâmetros, retorna a url
   * completa com path da api
   *
   * @private
   * @param {string} route
   * @param {Params} [params]
   * @returns {string}
   *
   * @memberof ApiBaseService
   */
  private normalizeURI (route: string, params?: Params): string {
    let normalized = `${this.apiEndPoint}/${route.trim().split('/').filter(r => r.length).join('/')}`
    if (params) {
      Object.keys(params)
        .forEach(key => normalized += `${normalized.indexOf('?') === -1 ? '?' : '&'}${key}=${params[key]}`)
    }
    return normalized
  }

  /**
   * Normalize observable response
   * dado um Observable do tipo Response (resposta do servidor)
   * aplica todos os métodos de adaptação dessa resposta para
   * a aplicação
   *
   * @private
   * @param {Observable<Response>} source
   * @returns {(Observable<T | T[]>)}
   *
   * @memberof ApiBaseService
   */
  private normalizeObservable (source: Observable<Response>): Observable<T | T[]> {
    return source
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }

}
