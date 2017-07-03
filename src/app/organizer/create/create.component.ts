import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/core/auth'
import { ApiService } from 'app/core/providers'
import { Event, Organization } from 'models'

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateEventComponent {

  public event: Event = new Event()
  private api: ApiService
  private auth: AuthService
  private router: Router
  constructor (api: ApiService, auth: AuthService, router: Router) {
    this.api = api
    this.auth = auth
    this.router = router
    this.event.time.start = this.event.time.end = this.event.date = null as any
  }

  /**
   * On Submit form create
   *
   * @param {Event} event
   * @memberof CreateEventComponent
   */
  public submit (event: Event): void {
    const sub = this.api.event.save(event)
      .subscribe(
        ev => {
          let organization = new Organization()
          organization.event = ev.id
          organization.user = this.auth.atualUser ? this.auth.atualUser.id || '' : ''
          const sub2 = this.api.organization.save(organization)
            .subscribe(
              () => {
                this.router.navigate(['/organizer'])
                alert(`Evento "${ev.name}" criado com sucesso!`)
              },
              err => alert(`Erro na associação de organização: ${err}`),
              () => {
                sub2.unsubscribe()
              }
            )
        },
        err => alert(err),
        () => {
          sub.unsubscribe()
        }
      )
  }

}
