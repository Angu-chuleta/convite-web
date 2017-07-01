import { ApiBaseService } from 'app/core/providers/api/api-base.service'
import { IBase } from 'interfaces'
import { Observable } from 'rxjs/Observable'

export abstract class BaseModel implements IBase {

  public active: boolean = true

  /**
   * Instância da api para refletir ações de CRUD no banco
   *
   * @protected
   * @type {ApiBaseService<IBase>}@memberof BaseModel
   */
  protected api?: ApiBaseService<IBase>

  /**
   * ID privado, pois somente quem cria ID é a api
   *
   * @private
   * @type {string}@memberof BaseModel
   */
  private pId: string = undefined as any

  /**
   * Data de criação privado, pois somente quem altera
   * este campo é a api
   *
   * @private
   * @type {Date}@memberof BaseModel
   */
  private pCreatedAt: Date = undefined as any

  /**
   * Data de atualização privado, pois somente quem altera
   * este campo é a api
   *
   * @private
   * @type {Date}@memberof BaseModel
   */
  private pUpdatedAt: Date = undefined as any

  /**
   * Creates an instance of BaseModel.
   * @param {string} [id]
   * @param {Date} [createdAt]
   * @param {Date} [updatedAt]
   * @param {ApiBaseService<IBase>} [api]
   * @memberof BaseModel
   */
  constructor (id?: string, createdAt?: Date, updatedAt?: Date, api?: ApiBaseService<IBase>) {
    this.api = api
    if (id) {
      this.pId = id
    }
    if (createdAt) {
      this.pCreatedAt = createdAt
    }
    if (updatedAt) {
      this.pUpdatedAt = updatedAt
    }
  }

  /**
   * GET id
   * Identificador
   *
   * @readonly
   * @type {string}@memberof BaseModel
   */
  public get id (): string { return this.pId }

  /**
   * GET updatedAt
   * Data de criação do objeto na api
   *
   * @readonly
   * @type {Date}@memberof BaseModel
   */
  public get createdAt (): Date { return this.pCreatedAt }

  /**
   * GET updatedAt
   * Data da última atualização do objeto na api
   *
   * @readonly
   * @type {Date}@memberof BaseModel
   */
  public get updatedAt (): Date { return this.pUpdatedAt }

  /**
   * Save model from self instance
   *
   * @returns {Observable<any>}
   * @memberof BaseModel
   */
  public save (): Observable<any> {
    if (!this.api) {
      throw new Error('No api instance for model save!')
    }
    const self: any = Object.assign({}, this)
    delete self.api
    delete self.id
    delete self.pId
    self.id = this.id
    return this.api.save(self)
  }

}
