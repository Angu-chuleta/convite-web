import { Injectable } from '@angular/core'
import { EventsApiService } from './events-api.service'

@Injectable()
export class ApiService {

  /**
   * API de eventos
   *
   * @type {EventsApiService}@memberof ApiService
   */
  public events: EventsApiService

  /**
   * Creates an instance of ApiService.
   * @param {EventsApiService} events
   * @memberof ApiService
   */
  constructor (events: EventsApiService) {
    this.events = events
  }

}
