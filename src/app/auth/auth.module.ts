import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'

import {
  LoginComponent,
  LoginFormComponent
} from './login'

import {
  PreSignUpFormComponent,
  SignUpComponent,
  SignUpFormComponent
} from './sign-up'

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    // Login
    AuthComponent,
    LoginComponent,
    LoginFormComponent,

    // Sign in
    PreSignUpFormComponent,
    SignUpComponent,
    SignUpFormComponent
  ]
})
export class AuthModule { }
