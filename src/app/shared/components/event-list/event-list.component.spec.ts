import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SharedModule } from 'app/shared'
import { EventListComponent } from './event-list.component'

describe('EventListComponent', () => {
  let component: EventListComponent
  let fixture: ComponentFixture<EventListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
