import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared'
import { OrganizerRoutingModule } from './organizer-routing.module'
import { OrganizerComponent } from './organizer.component'

@NgModule({
  imports: [
    SharedModule,
    OrganizerRoutingModule
  ],
  declarations: [
    OrganizerComponent
  ]
})
export class OrganizerModule { }
