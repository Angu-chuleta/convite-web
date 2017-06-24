import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { CoreModule } from 'app/core'
import { AuthService } from 'app/core/auth'
import { SharedModule } from 'app/shared'
import { ActivatedRouteStub, AuthStub, RouterStub } from 'stubs'
import { LoginFormComponent } from './login-form/login-form.component'
import { LoginComponent } from './login.component'

describe('LoginComponent ->', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoginFormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created ->', () => {
    expect(component).toBeTruthy()
  })

  it('Login success ->', () => {
    const credentials = {
      email: 'test@test.com.br',
      keepLogin: false,
      password: 'test'
    }
    component.onSubmit(credentials)
    expect(component.credentials).toEqual(credentials)
  })

  it('Login fail ->', () => {
    component.onSubmit(undefined as any)
    expect(component.credentials).toEqual({})
  })

})
