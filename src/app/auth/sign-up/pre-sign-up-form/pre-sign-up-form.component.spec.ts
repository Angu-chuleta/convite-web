import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { PreSignUpFormComponent } from './pre-sign-up-form.component'

describe('PreSignUpFormComponent', () => {
  let component: PreSignUpFormComponent
  let fixture: ComponentFixture<PreSignUpFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreSignUpFormComponent],
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSignUpFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
