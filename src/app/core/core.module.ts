import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { AuthService } from './auth/auth.service'
import { AuthRouterGuard } from './auth/guards/auth-router.guard'
import { IsLoggedInGuard } from './auth/guards/is-logged-in.guard'
import { JwtHelper } from './auth/jwt-helper'
import { TokenStorageService } from './auth/token-storage.service'
import { StorageService } from './storage'

@NgModule({
  imports: [
    HttpModule,
    RouterModule
  ],
  providers: [
    AuthService,
    AuthRouterGuard,
    IsLoggedInGuard,
    JwtHelper,
    TokenStorageService,
    StorageService
  ]
})
export class CoreModule { }
