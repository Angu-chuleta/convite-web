import { Response } from '@angular/http'
import { BaseService } from './base.service'

class BaseServiceTest extends BaseService {
  testExtract (res: Response) {
    return this.extractData(res)
  }

  testHandle (err: any) {
    return this.handleError(err)
  }
}
let baseService: BaseServiceTest

describe('BaseService Test ->', () => {

  beforeEach(() => {
    baseService = new BaseServiceTest()
  })

  it('Is defined ->', () => {
    expect(BaseService).toBeDefined('A classe BaseService não está definida!')
    expect(baseService).toBeDefined('baseService não foi instanciado corretamente!')
  })

  it('Extract data ->', () => {
    const RES_JSON = { json: () => { return new Object() }, text: () => 'NO BODY' }
    const RES_TEXT = { json: () => { throw new Error() }, text: () => 'BODY' }

    const RES_ERR = { json: () => { throw new Error() }, text: () => { throw new Error() } }

    expect(baseService.testExtract(RES_JSON as Response)).toEqual(new Object(), 'Não retornou corretamente os dados JSON')

    expect(baseService.testExtract(RES_TEXT as any)).toEqual('BODY', 'Não retornou corretamente os dados STRING')

    expect(baseService.testExtract(RES_ERR as any)).toBeNull('Não retornou corretamente')

  })

  it('Handle error ->', () => {
    const ERROR_RES = { json: () => { return { error: new Error(), message: 'ERROR TEST' } }, text: () => 'NO BODY' }
    const ERROR_RES2 = { json: () => { return { error: new Error('ERROR TEST') } }, text: () => 'NO BODY' }
    const ERROR_RES3 = { json: () => undefined, text: () => 'NO BODY' }
    const ERROR_TEXT = { json: () => { throw new Error() }, text: () => 'ERROR TEST' }
    const ERROR_TEXT2 = { json: () => { throw new Error() }, text: () => undefined }
    const RES_ERR = { json: () => { throw new Error() }, text: () => { throw new Error() } }

    baseService.testHandle(ERROR_RES as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('ERROR TEST', 'Não respondeu a string corretamente!')
      }
      )

    baseService.testHandle(ERROR_RES2 as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('ERROR TEST', 'Não respondeu a string corretamente!')
      }
      )

    baseService.testHandle(ERROR_RES3 as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('Ocorreu um erro inesperado!', 'Não respondeu a string corretamente!')
      }
      )

    baseService.testHandle(ERROR_TEXT as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('ERROR TEST', 'Não respondeu a string corretamente!')
      }
      )

    baseService.testHandle(ERROR_TEXT2 as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('Ocorreu um erro inesperado!', 'Não respondeu a string corretamente!')
      }
      )

    baseService.testHandle(RES_ERR as any)
      .subscribe(
      () => void (0),
      err => {
        expect(err).toEqual('Ocorreu um erro inesperado!', 'Não respondeu a string corretamente!')
      }
      )

  })

})
