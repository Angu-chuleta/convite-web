import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Event } from 'models'
import { ApiBaseService } from './api-base.service'

@Injectable()
export class EventApiService extends ApiBaseService<Event> {

  /**
   * Creates an instance of EventsApiService.
   * @param {Http} http
   * @memberof EventsApiService
   */
  constructor (http: Http) {
    super(http, Event)
    this.setResource('events')
  }

}
