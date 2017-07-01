import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrganizerComponent } from './organizer.component'

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    children: [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full'
      },
      {
        path: 'events',
        component: OrganizerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
