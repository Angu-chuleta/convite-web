import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Event, Pagination } from 'models'

@Component({
  selector: 'inv-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() public events: Pagination<Event> = new Pagination<Event>()
  @Output() public onPageChange = new EventEmitter<{page: number, pageSize: number}>()
  public pageSize: number = 10
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100]

  public changePage (event: { first: number, rows: number, page: number, pageCount: number }) {
    this.onPageChange.emit({ page: event.page + 1, pageSize: event.rows })
  }

}
