import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared'
import { CreateEventComponent } from './create/create.component'
import { EventFormComponent } from './event-form/event-form.component'
import { EventListComponent } from './event-list/event-list.component'
import { OrganizerRoutingModule } from './organizer-routing.module'
import { OrganizerComponent } from './organizer.component'

@NgModule({
  imports: [
    SharedModule,
    OrganizerRoutingModule
  ],
  declarations: [
    CreateEventComponent,
    EventFormComponent,
    EventListComponent,
    OrganizerComponent
  ]
})
export class OrganizerModule { }
