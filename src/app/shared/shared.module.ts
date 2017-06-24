import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

// Components
import {
  FooterComponent,
  LayoutDefaultComponent,
  LayoutExtraComponent,
  LoadingLoggedOutComponent,
  LogoComponent,
  NavbarComponent,
  SidebarComponent,
  ValidationMessageComponent
} from './components'

@NgModule({
  declarations: [
    FooterComponent,
    LayoutDefaultComponent,
    LayoutExtraComponent,
    LoadingLoggedOutComponent,
    LogoComponent,
    NavbarComponent,
    SidebarComponent,
    ValidationMessageComponent
  ],
  imports: [
    // Angular imports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Angular exports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Components
    FooterComponent,
    LayoutDefaultComponent,
    LayoutExtraComponent,
    LoadingLoggedOutComponent,
    LogoComponent,
    NavbarComponent,
    SidebarComponent,
    ValidationMessageComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
