import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
