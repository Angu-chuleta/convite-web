import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth.component'
import { LoginComponent } from './login'
import { SignUpComponent } from './sign-up'

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
