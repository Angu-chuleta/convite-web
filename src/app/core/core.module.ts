import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import {
  AuthRouterGuard,
  AuthService,
  httpProvider,
  IsLoggedInGuard,
  JwtHelper
} from './auth'
import { TokenStorageService } from './auth/token-storage.service'
import {
  ApiService,
  CepService
} from './providers'
import { EventApiService } from './providers/api/event-api.service'
import { InvitationApiService } from './providers/api/invitation-api.service'
import { OrganizationApiService } from './providers/api/organization-api.service'
import { StorageService } from './storage'

@NgModule({
  imports: [
    HttpModule,
    RouterModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthRouterGuard,
    CepService,
    EventApiService,
    httpProvider,
    InvitationApiService,
    IsLoggedInGuard,
    JwtHelper,
    OrganizationApiService,
    StorageService,
    TokenStorageService
  ]
})
export class CoreModule { }
