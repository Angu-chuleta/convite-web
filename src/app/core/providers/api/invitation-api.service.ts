import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Invitation } from 'models'
import { ApiBaseService } from './api-base.service'

@Injectable()
export class InvitationApiService extends ApiBaseService<Invitation> {

  /**
   * Creates an instance of InvitationApiService.
   * @param {Http} http
   * @memberof InvitationApiService
   */
  constructor (http: Http) {
    super(http, Invitation)
    this.setResource('invitations')
  }

}
