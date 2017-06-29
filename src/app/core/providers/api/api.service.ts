import { Injectable } from '@angular/core'
import { EventApiService } from './events-api.service'
import { InvitationApiService } from './invitation-api.service'

@Injectable()
export class ApiService {

  /**
   * Serviço de API de eventos
   *
   * @type {EventApiService}@memberof ApiService
   */
  public event: EventApiService

  /**
   * Serviço de API de convites
   *
   * @type {InvitationApiService}
   * @memberof ApiService
   */
  public invitation: InvitationApiService

  /**
   * Creates an instance of ApiService.
   * @param {EventsApiService} events
   * @memberof ApiService
   */
  constructor (event: EventApiService, invitation: InvitationApiService) {
    this.event = event
    this.invitation = invitation
  }

}
