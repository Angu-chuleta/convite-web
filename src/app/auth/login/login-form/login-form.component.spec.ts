import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { LoginFormComponent } from './login-form.component'

describe('LoginFormComponent', () => {
  let component: LoginFormComponent
  let fixture: ComponentFixture<LoginFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
