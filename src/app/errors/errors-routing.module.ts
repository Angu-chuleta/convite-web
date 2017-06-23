import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ErrorsComponent } from './errors.component'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    component: ErrorsComponent,
    children: [
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
