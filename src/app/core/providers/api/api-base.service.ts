import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { GRC_CONFIG } from 'app/core'
import { IBase, IPagination } from 'interfaces'
import { FactoryModel, Pagination } from 'models'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import { Observable } from 'rxjs/Observable'
import { BaseService } from '../base.service'

type Params = { [key: string]: number | string }

@Injectable()
export abstract class ApiBaseService<T extends IBase> extends BaseService {

  protected apiEndPoint: string = GRC_CONFIG.apiEndPoint
  protected resource: string
  private http: Http
  private factoryModel: FactoryModel<T>

  /**
   * Creates an instance of ApiBaseService.
   * @param {Http} http
   *
   * @memberof ApiBaseService
   */
  constructor (http: Http, construct: new (id?: string, createdAt?: Date, updatedAt?: Date, api?: ApiBaseService<T>) => T) {
    super()
    this.http = http
    this.factoryModel = new FactoryModel<T>(construct)
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
   * Custom query
   * Consultas personalizadas
   *
   * @param {Object} body
   * @param {Params} [params]
   * @returns {Observable<Pagination<T>>}
   * @memberof ApiBaseService
   */
  public query ( body: Object, params?: Params ): Observable<Pagination<T>> {
    return this.normalizeObservable(
      this.http.post( this.normalizeURI( `/query`, params ), body )
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
    if (!model.id) {
      throw new Error('ID not defined! Delete fail')
    }
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
    if (!model.id) { throw new Error('No update without id') }
    return this.normalizeObservable(
      this.http.put(this.normalizeURI(model.id), model)
    )
  }

  /**
   * Instancia a classe referente ao modelo que está consumindo
   * da api.
   *
   * Esse método é executado para mapear os resultados obtidos em
   * quaisquer consultas na api. Transformando Object JSON em T ou T[]
   *
   * @protected
   * @param {*} data
   * @returns {(T | T[])}
   * @memberof ApiBaseService
   */
  protected instanceModel (data: any): T | T[] | IPagination<T> {
    if (data instanceof Array) {
      return data.map((el: any) => this.instanceModel(el) as T)
    } else if (data && (data.result instanceof Array)) {
      let page = new Pagination<T>()
      page.page = Number(data.page)
      page.pageSize = data.result.length
      page.total = Number(data.total)
      page.result = data.result.map((el: any) => this.instanceModel(el))
      return page
    }
    return this.factoryModel.fromData(data, this)
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
   * @returns {(Observable<T | T[] | Pagination<T>>)}
   * @memberof ApiBaseService
   */
  private normalizeObservable (source: Observable<Response>): Observable<T | T[] | Pagination<T>> {
    return source
      .share()
      .map(res => this.extractData(res))
      .map(data => this.instanceModel(data))
      .catch(err => this.handleError(err))
  }

}
