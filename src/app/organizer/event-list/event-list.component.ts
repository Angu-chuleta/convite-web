import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from 'app/core/auth'
import { ApiService } from 'app/core/providers'
import { Event, Pagination } from 'models'
import { Subscription } from 'rxjs/Subscription'

@Component({
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnDestroy, OnInit {
  api: ApiService
  events: Pagination<Event> = new Pagination<Event>()
  private subscriptions: Array<Subscription> = []
  private auth: AuthService

  constructor (api: ApiService, auth: AuthService) {
    this.api = api
    this.auth = auth
  }

  public ngOnInit (): void {
    this.getEvents({page: 1, pageSize: 10})
  }

  public getEvents (pagination: {page: number, pageSize: number}): void {
    this.subscriptions.push(this.api.organization.query({
      user: this.auth.atualUser ? this.auth.atualUser.id : ''
    }, { page: pagination.page, limit: pagination.pageSize }).subscribe(
      org => {
        this.subscriptions.push(this.api.event.query({
          id: {
            in: org.result.map(o => o.event)
          }
        }).subscribe(
          events => this.events = events,
          err => alert(err)
        ))
      },
      err => alert(err)
    ))
  }

  public ngOnDestroy (): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
