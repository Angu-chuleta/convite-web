import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateEventComponent } from './create/create.component'
import { EventListComponent } from './event-list/event-list.component'
import { OrganizerComponent } from './organizer.component'

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    children: [
      {
        path: '',
        component: EventListComponent
      },
      {
        path: 'create',
        component: CreateEventComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
