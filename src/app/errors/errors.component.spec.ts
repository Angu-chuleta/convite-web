import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from 'app/shared'
import { RouterOutletStub } from 'stubs'
import { ErrorsComponent } from './errors.component'

describe('ErrorsComponent', () => {
  let component: ErrorsComponent
  let fixture: ComponentFixture<ErrorsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorsComponent,
        RouterOutletStub
      ],
      imports: [
        SharedModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
