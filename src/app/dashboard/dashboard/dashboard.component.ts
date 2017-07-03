import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from 'app/core/providers'
import { Event } from 'models'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  public recentEvents: Array<Event> = []
  public numEventsOrganized: number = 0
  public numEventsColabored: number = 0
  public numInvitations: number = 10
  private api: ApiService
  private subscriptions: Array<Subscription> = []
  constructor (api: ApiService) {
    this.api = api
  }

  /**
   * On page load complete
   *
   * @memberof DashboardComponent
   */
  ngOnInit (): void {
    this.subscriptions.push(
      this.api.getRecentEvents()
      .subscribe(events => {
        this.recentEvents = events
        this.numEventsColabored = events.filter(e => e.userRole === 'Colaborador').length
        this.numEventsOrganized = events.filter(e => e.userRole === 'Organizador').length
      },
      err => void(0))
    )
  }

  /**
   * On destroy page
   *
   * @memberof DashboardComponent
   */
  ngOnDestroy (): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
