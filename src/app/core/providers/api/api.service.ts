import { Injectable } from '@angular/core'
import { AuthService } from 'app/core/auth'
import { ETypeOrganizer } from 'interfaces'
import { Event, Invitation, Organization } from 'models'
import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Observable'
import { EventApiService } from './event-api.service'
import { InvitationApiService } from './invitation-api.service'
import { OrganizationApiService } from './organization-api.service'

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
   * Serviço de API de Organização de Eventos
   *
   * @type {OrganizationApiService}
   * @memberof ApiService
   */
  public organization: OrganizationApiService

  private auth: AuthService

  /**
   * Creates an instance of ApiService.
   * @param {EventApiService} event
   * @param {InvitationApiService} invitation
   * @param {OrganizationApiService} organization
   * @memberof ApiService
   */
  constructor (event: EventApiService, invitation: InvitationApiService, organization: OrganizationApiService, auth: AuthService) {
    this.event = event
    this.invitation = invitation
    this.organization = organization
    this.auth = auth
  }

  /**
   * GET eventos recentes do usuário atual logado
   *
   * @returns {Observable<Array<Event>>}
   * @memberof ApiService
   */
  getRecentEvents (): Observable<Array<Event>> {
    return new Observable<Array<Event>>(sub => {
      const queryParams = { page: 1, limit: 5 }
      let promises = new Array<Promise<any>>()
      promises.push(this.organization.query({ where: { user: this.auth.atualUser.id } }, queryParams).toPromise())
      promises.push(this.invitation.query({ where: { guest: this.auth.atualUser.id } }, queryParams).toPromise())
      Promise.all(promises)
        .catch(err => sub.error(err))
        .then(queries => {
          if (!queries) { return [] }
          const organizations: Array<string> = queries[0].result.filter((e: Organization) => e.type === ETypeOrganizer.ORGANIZADOR).map((o: Organization) => o.event)
          const colaborations: Array<string> = queries[0].result.filter((e: Organization) => e.type === ETypeOrganizer.COLABORADOR).map((o: Organization) => o.event)
          const invitations: Array<string> = queries[1].result.map((i: Invitation) => i.event)
          return this.event.query({
            where: { id: { 'in': [...organizations, ...colaborations, ...invitations] } }
          }, queryParams).toPromise().then(page => page.result.map(event => {
            if (organizations.indexOf(event.id) !== -1) {
              event.userRole = 'Organizador'
            } else if (colaborations.indexOf(event.id) !== -1) {
              event.userRole = 'Colaborador'
            } else {
              event.userRole = 'Convidado'
            }
            return event
          }))
        })
        .then(events => sub.next(events))
    })
  }

}
