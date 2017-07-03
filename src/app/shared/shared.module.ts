import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TextMaskModule } from 'angular2-text-mask'

// primeng
import {
    AutoCompleteModule,
    CalendarModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    MultiSelectModule,
    PaginatorModule,
    SharedModule as PrimeNgSharedModule,
    TooltipModule,
    TreeTableModule
} from 'primeng/primeng'

// Components
import {
  EventListComponent,
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
    EventListComponent,
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
    RouterModule,

    // Others imports
    TextMaskModule,

    // PrimeNG imports
    AutoCompleteModule,
    CalendarModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    MultiSelectModule,
    PaginatorModule,
    PrimeNgSharedModule,
    TooltipModule,
    TreeTableModule
  ],
  exports: [
    // Angular exports
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Components
    EventListComponent,
    FooterComponent,
    LayoutDefaultComponent,
    LayoutExtraComponent,
    LoadingLoggedOutComponent,
    LogoComponent,
    NavbarComponent,
    SidebarComponent,
    ValidationMessageComponent,

    // Others exports
    TextMaskModule,

    // PrimeNG exports
    AutoCompleteModule,
    CalendarModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    MultiSelectModule,
    PaginatorModule,
    PrimeNgSharedModule,
    TooltipModule,
    TreeTableModule
  ],
  providers: [
  ]
})
export class SharedModule { }
