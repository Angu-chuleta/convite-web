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
import { ApiService } from './providers'
import { EventApiService } from './providers/api/events-api.service'
import { InvitationApiService } from './providers/api/invitation-api.service'
import { StorageService } from './storage'

@NgModule({
  imports: [
    HttpModule,
    RouterModule
  ],
  providers: [
    AuthService,
    AuthRouterGuard,
    httpProvider,
    IsLoggedInGuard,
    JwtHelper,
    TokenStorageService,
    ApiService,
    EventApiService,
    InvitationApiService,
    StorageService
  ]
})
export class CoreModule { }
