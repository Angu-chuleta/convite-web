import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { CoreModule } from 'app/core'
import { AuthService } from 'app/core/auth'
import { SharedModule } from 'app/shared'
import 'rxjs/Subscription'
import { AuthStub } from 'stubs'
import { ActivatedRouteStub, RouterStub } from 'stubs'
import { PreSignUpFormComponent } from './pre-sign-up-form/pre-sign-up-form.component'
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component'
import { SignUpComponent } from './sign-up.component'

/**
 * Component without token in queryParams
 */
describe('SignUpComponent without token ->', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreSignUpFormComponent,
        SignUpFormComponent,
        SignUpComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created ->', () => {
    expect(component).toBeTruthy()
  })

  it('Pre sign up error ->', () => {
    component.preSignUp(undefined as any)
    expect(component.alert.message).toEqual('Test error')
    expect(component.alert.color).toEqual('danger')
  })

  it('Pre sign up success ->', () => {
    component.preSignUp({ email: 'test@test.com' })
    expect(component.alert.message).toBeTruthy()
    expect(component.alert.color).toEqual('success')
  })

})

/**
 * Component with token in queryParams
 */
describe('SignUpComponent with token ->', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(async(() => {
    ActivatedRouteStub.queryParams = {
      token: 'token-unit-test-a12345667890'
    }
    TestBed.configureTestingModule({
      declarations: [
        PreSignUpFormComponent,
        SignUpFormComponent,
        SignUpComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created ->', () => {
    expect(component).toBeTruthy()
  })

  it('Sign up error ->', () => {
    component.signUp(undefined as any)
    expect(component.alert.message).toEqual('Test error')
    expect(component.alert.color).toEqual('danger')
  })

  it('Sign up success ->', () => {
    component.signUp({
      name: 'test',
      email: 'test@test.com',
      password: 'test123',
      confirm: 'test123'
    })
    expect(component.alert.message).toEqual('Cadastro realizado com sucesso!')
    expect(component.alert.color).toEqual('success')
  })

  afterEach(() => {
    ActivatedRouteStub.queryParams = {}
  })

})

/**
 * Component with invalid token in queryParams
 */
describe('SignUpComponent with invalid token ->', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(async(() => {
    ActivatedRouteStub.queryParams = {
      'token': 'test-error-token'
    }
    TestBed.configureTestingModule({
      declarations: [
        PreSignUpFormComponent,
        SignUpFormComponent,
        SignUpComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created ->', () => {
    expect(component).toBeTruthy()
  })

  afterEach(() => {
    ActivatedRouteStub.queryParams = {}
  })

})
