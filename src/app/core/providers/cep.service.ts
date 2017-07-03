import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { IEventsPlace } from 'interfaces'
import { Observable } from 'rxjs/Observable'
import { BaseService } from './base.service'


interface IViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

@Injectable()
export class CepService extends BaseService {

  private http: Http
  constructor (http: Http) {
    super()
    this.http = http
  }

  public getAddress (cep: string): Observable<IEventsPlace> {
    let headers = new Headers()
    headers.set('noAuthToken', 'true')
    return this.http.get(this.normalizeUri(cep), { headers: headers })
      .map(res => this.extractData(res))
      .map(data => this.adapterAddress(data))
  }

  /**
   * Adaptador para entrada da resposta do webservice
   * via cep para a interface interna iEventsPlace
   *
   * @private
   * @param {IViaCepResponse} data
   * @returns {IEventsPlace}
   * @memberof CepService
   */
  private adapterAddress (data: IViaCepResponse): IEventsPlace {
    return {
      country: 'Brasil',
      zipCode: data.cep,
      address: data.logradouro,
      complement: data.complemento,
      neighbor: data.bairro,
      city: data.localidade,
      state: data.uf
    } as any
  }

  private normalizeUri (cep: string): string {
    return `https://viacep.com.br/ws/${cep}/json`
  }

}
