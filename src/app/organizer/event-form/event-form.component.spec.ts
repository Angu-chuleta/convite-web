import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { EventFormComponent } from './event-form.component'

describe('EventFormComponent', () => {
  let component: EventFormComponent
  let fixture: ComponentFixture<EventFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormComponent ],
      imports: [
        CoreModule,
        SharedModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
