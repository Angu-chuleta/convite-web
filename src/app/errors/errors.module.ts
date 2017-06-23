import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared'
import { ErrorsRoutingModule } from './errors-routing.module'
import { ErrorsComponent } from './errors.component'
import { NotFoundComponent } from './not-found/not-found.component'

@NgModule({
  imports: [
    ErrorsRoutingModule,
    SharedModule
  ],
  declarations: [NotFoundComponent, ErrorsComponent]
})
export class ErrorsModule { }
