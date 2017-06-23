import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { SignUpFormComponent } from './sign-up-form.component'

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent
  let fixture: ComponentFixture<SignUpFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
