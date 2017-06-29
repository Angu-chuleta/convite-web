import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Organization } from 'models'
import { ApiBaseService } from './api-base.service'

@Injectable()
export class OrganizationApiService extends ApiBaseService<Organization> {

  /**
   * Creates an instance of OrganizationApiService.
   * @param {Http} http
   * @memberof OrganizationApiService
   */
  constructor (http: Http) {
    super(http, Organization)
    this.setResource('organization')
  }

}
