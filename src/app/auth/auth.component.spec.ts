import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { CoreModule } from 'app/core'
import { AuthService } from 'app/core/auth'
import { SharedModule } from 'app/shared'
import { RouterOutletStub, RouterStub } from 'stubs'
import { AuthComponent } from './auth.component'

class AuthStub extends AuthService {
  /**
   * User is authenticated
   *
   * @readonly
   * @override
   * @type {boolean}
   * @memberof AuthStub
   */
  public get isAuthenticated (): boolean {
    return true
  }
}

describe('AuthComponent ->', () => {
  let component: AuthComponent
  let fixture: ComponentFixture<AuthComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        RouterOutletStub
      ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        HttpModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created ->', () => {
    expect(component).toBeTruthy()
  })

})
