import { ApiBaseService } from 'app/core/providers/api/api-base.service'
import { IBase } from 'interfaces'

export class FactoryModel<I extends IBase> {

  /**
   * Construtor da instância que a fábrica produzirá
   *
   * @private
   * @memberof FactoryModel
   */
  private construct: new (id?: string, createdAt?: Date, updatedAt?: Date, api?: ApiBaseService<I>) => I

  /**
   * Creates an instance of FactoryModel.
   * @param {new (id?: string, createdAt?: Date, updatedAt?: Date) => I} construct
   * @memberof FactoryModel
   */
  constructor ( construct: new (id?: string, createdAt?: Date, updatedAt?: Date, api?: ApiBaseService<I>) => I ) {
    this.construct = construct
  }

  public fromData (data: any | Array<any>, api: ApiBaseService<I>): I {

    const instance: any = new this.construct(data.id, data.createdAt, data.updatedAt, api)

    Object.keys(data).forEach(key => {
      switch (key) {
        case 'id':
        case 'createdAt':
        case 'updatedAt':
          break
        default:
          instance[key] = data[key]
      }
    })

    return instance
  }
}
